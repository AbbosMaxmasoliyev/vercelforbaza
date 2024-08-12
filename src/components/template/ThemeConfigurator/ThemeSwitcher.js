import React, { useState } from 'react'
import classNames from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import { setThemeColor, setThemeColorLevel } from 'store/theme/themeSlice'
import { HiCheck, HiChevronDown } from 'react-icons/hi'

const colorList = [
	{ label: 'Red', value: 'red' },
	{ label: 'Orange', value: 'orange' },
	{ label: 'Amber', value: 'amber' },
	{ label: 'Yellow', value: 'yellow' },
	{ label: 'Lime', value: 'lime' },
	{ label: 'Green', value: 'green' },
	{ label: 'Emerald', value: 'emerald' },
	{ label: 'Teal', value: 'teal' },
	{ label: 'Cyan', value: 'cyan' },
	{ label: 'Sky', value: 'sky' },
	{ label: 'Blue', value: 'blue' },
	{ label: 'Indigo', value: 'indigo' },
	{ label: 'Violet', value: 'violet' },
	{ label: 'Purple', value: 'purple' },
	{ label: 'Fuchsia', value: 'fuchsia' },
	{ label: 'Pink', value: 'pink' },
	{ label: 'Rose', value: 'rose' }
]

const colorLevelList = [
	{ label: '400', value: 400 },
	{ label: '500', value: 500 },
	{ label: '600', value: 600 },
	{ label: '700', value: 700 },
	{ label: '800', value: 800 },
	{ label: '900', value: 900 },
]

const ColorBadge = ({ className, themeColor }) => {
	const primaryColorLevel = useSelector((state) => state.theme.primaryColorLevel)

	return (
		<div
			className={classNames(
				className,
				`w-4 h-4 rounded-full bg-${themeColor}-${primaryColorLevel}`
			)}
		/>
	)
}

const CustomSelectOption = ({ label, value, isSelected, onClick }) => {
	return (
		<div
			className={`flex items-center justify-between p-2 ${isSelected ? 'bg-gray-100 dark:bg-gray-500' : 'hover:bg-gray-50 dark:hover:bg-gray-600'}`}
			onClick={onClick}
		>
			<div className="flex items-center gap-2">
				<ColorBadge themeColor={value} />
				<span>{label}</span>
			</div>
			{isSelected && <HiCheck className="text-emerald-500 text-xl" />}
		</div>
	)
}

const CustomControl = ({ selectedOption, children, onToggle }) => {
	const themeColor = useSelector((state) => state.theme.themeColor)

	return (
		<div
			className="flex items-center justify-between border p-2 rounded-md cursor-pointer"
			onClick={onToggle}
		>
			{selectedOption && <ColorBadge themeColor={themeColor} className="ltr:ml-4 rtl:mr-4" />}
			{children}
			<HiChevronDown />
		</div>
	)
}

const Select = ({ options, value, onChange, renderOption, renderControl }) => {
	const [isOpen, setIsOpen] = useState(false)

	const selectedOption = options.find(option => option.value === value)

	const handleOptionClick = option => {
		onChange(option)
		setIsOpen(false)
	}

	return (
		<div>
			{renderControl({ selectedOption, onToggle: () => setIsOpen(!isOpen) })}
			{isOpen && (
				<div className="absolute z-10 bg-white border rounded-md shadow-lg w-full mt-1">
					{options.map(option => (
						renderOption({
							...option,
							isSelected: option.value === value,
							onClick: () => handleOptionClick(option)
						})
					))}
				</div>
			)}
		</div>
	)
}

const ThemeSwitcher = () => {
	const dispatch = useDispatch()

	const themeColor = useSelector((state) => state.theme.themeColor)
	const primaryColorLevel = useSelector((state) => state.theme.primaryColorLevel)

	const onThemeColorChange = (option) => {
		dispatch(setThemeColor(option.value))
	}

	const onThemeColorLevelChange = (option) => {
		dispatch(setThemeColorLevel(option.value))
	}

	return (
		<div className="grid grid-cols-2 gap-4">
			<Select
				options={colorList}
				value={themeColor}
				onChange={onThemeColorChange}
				renderOption={(props) => <CustomSelectOption {...props} />}
				renderControl={(props) => <CustomControl {...props} />}
			/>
			<Select
				options={colorLevelList}
				value={primaryColorLevel}
				onChange={onThemeColorLevelChange}
				renderOption={(props) => <CustomSelectOption {...props} />}
				renderControl={(props) => <CustomControl {...props} />}
			/>
		</div>
	)
}

export default ThemeSwitcher
