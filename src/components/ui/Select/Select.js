import React, { useState } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import tw, { theme } from 'twin.macro'
import { useConfig } from '../ConfigProvider'
import { useForm } from '../Form/context'
import { useInputGroup } from '../InputGroup/context'
import { HiCheck, HiChevronDown, HiX } from 'react-icons/hi'
import Spinner from '../Spinner'
import { CONTROL_SIZES, SIZES } from '../utils/constant'

const DefaultOption = ({ label, isSelected, isDisabled, onClick }) => {
	const { themeColor } = useConfig()
	return (
		<div 
			className={`select-option ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`} 
			onClick={onClick}
		>
			<span className="ml-2">{label}</span>
			{isSelected && <HiCheck className={`text-${themeColor} dark:text-white text-xl`} />}
		</div>
	)
}

const DefaultDropdownIndicator = () => {
	return (
		<div className="select-dropdown-indicator">
			<HiChevronDown />
		</div>
	)
}

const DefaultClearIndicator = ({ onClick }) => {
	return (
		<div className="select-clear-indicator" onClick={onClick}>
			<HiX />
		</div>
	)
}

const DefaultLoadingIndicator = () => {
	const { themeColor } = useConfig()
	return (
		<Spinner className={`select-loading-indicatior text-${themeColor}`} />
	)
}

const Select = React.forwardRef((props, ref) => {

	const { 
		size, 
		style, 
		className, 
		options, 
		isLoading, 
		components, 
		componentAs: Component, 
		...rest 
	} = props

	const { themeColor, controlSize, primaryColorLevel, mode } = useConfig()
	const formControlSize = useForm()?.size
	const inputGroupSize = useInputGroup()?.size

	const selectSize = size || inputGroupSize || formControlSize || controlSize

	const twColor = theme`colors`
	const twHeight = theme`height`

	let isInvalid = false

	const [selectedOption, setSelectedOption] = useState(null)
	const [isOpen, setIsOpen] = useState(false)

	const handleOptionClick = option => {
		setSelectedOption(option)
		setIsOpen(false)
	}

	const styles = {
		control: {
			height: twHeight[CONTROL_SIZES[selectSize]],
			minHeight: twHeight[CONTROL_SIZES[selectSize]],
			'&:hover': { cursor: 'pointer' },
			borderRadius: tw`rounded-md`.borderRadius,
			...style
		},
		menu: { zIndex: 50, position: 'absolute', width: '100%' },
	}

	const selectClass = classNames(
		'select',
		`select-${selectSize}`,
		className
	)

	return (
		<div className={selectClass} ref={ref} style={styles.control} {...rest}>
			<div onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center">
				{selectedOption ? selectedOption.label : 'Select...'}
				<DefaultDropdownIndicator />
			</div>
			{isOpen && (
				<div style={styles.menu}>
					{isLoading && <DefaultLoadingIndicator />}
					{options.map(option => (
						<DefaultOption 
							key={option.value} 
							label={option.label} 
							isSelected={option.value === selectedOption?.value} 
							isDisabled={option.isDisabled} 
							onClick={() => handleOptionClick(option)}
						/>
					))}
				</div>
			)}
			{selectedOption && <DefaultClearIndicator onClick={() => setSelectedOption(null)} />}
		</div>
	)
})

Select.propTypes = {
	size: PropTypes.oneOf([SIZES.LG, SIZES.MD, SIZES.SM]),
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			value: PropTypes.string.isRequired,
			isDisabled: PropTypes.bool,
		})
	).isRequired,
	isLoading: PropTypes.bool,
	componentAs: PropTypes.elementType,
}

Select.defaultProps = {
	componentAs: 'div',
	isLoading: false,
	options: [],
}

export default Select
