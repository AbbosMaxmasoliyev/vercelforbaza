import { useEffect, useState } from 'react'
import Button from 'components/ui/Buttons'
import Dialog from 'components/ui/Dialog'
import { HiMinus, HiUserCircle } from 'react-icons/hi'
import { Formik, Form, Field, ErrorMessage, FieldArray, getIn } from "formik";
import FormItem from 'components/ui/Form/FormItem'
import * as Yup from "yup";
import { DatePicker, Drawer, FormContainer, Input } from 'components/ui';
import { openNotification } from 'utils/notification';
import ToastWrapper from 'components/ui/toast/ToastWrapper';
import SaleForm from './SaleForm';
import { createCleint } from 'services/client.service';
import { getStringDate } from 'utils/generate';
// import relativesCreate from './relatives';
const CreateUser = () => {


    const initialValues = {
        full_name: '',
        phone_number: '',
        birthday: '',
        region: '',
        gender: '',
        istagram: "",
        productsId: [],
        relatives: [],
    };





    const validationSchema = Yup.object({
        full_name: Yup.string().required('Ismingizni kiriting'),
        phone_number: Yup.string()
            .matches(/^\d{12}$/, 'Raqam noto\'g\'ri formatda')
            .required('Telefon raqamingizni kiriting'),
        birthday: Yup.string().required("Tu'gilgan kuni kiriting"),
        region: Yup.string().required("Istiqomat qiladigan joyini qo'shing"),
        gender: Yup.string().required('Jinsini tanlang'),
        instagram: Yup.string().required('Instagram hisobini kiriting'),
        relatives: Yup.array().of(
            Yup.object().shape({
                relationshipType: Yup.string().required('Relation required'),
                full_name: Yup.string().required('Name required'),
                birthday: Yup.string().required('Birthday required'),
                region: Yup.string().required('Region required'),
                phone_number: Yup.string().required('Phone number required'),
            })
        ),
    });

    const [dialogIsOpen, setIsOpen] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [diableFor, setDisabledFor] = useState(true)

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
    }

    useEffect(() => {
        return () => setDisabled(false)
    }, [])

    const onSubmit = async (values, error) => {
        console.log({ values });
        values.birthday = getStringDate(values.birthday)
        values.relatives = values.relatives.map(relative => {
            relative.birthday = getStringDate(relative.birthday)
            return relative
        })
        setDisabled(true)
        setDisabledFor(false)
        try {
            let respUser = await createCleint(values)
            console.log(respUser);

            openNotification("success", "User muvaffaqqiyatli yaratildi")
            onDialogClose()
        } catch (error) {

            openNotification("danger", "Xatolik bor")
        }
        setDisabled(false)


        // Bu yerda formani yuborish yoki API chaqirish mumkin
    };


    const fieldFeedback = (form, name) => {
        const error = getIn(form.errors, name)
        const touch = getIn(form.touched, name)
        return {
            errorMessage: error || '',
            invalid: typeof touch === 'undefined' ? false : error && touch,
        }
    }
    return (
        <div>
            <Button variant="solid" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center gap-2 font-mont' onClick={() => openDialog()}>
                User Add
                <HiUserCircle fontSize={20} />
            </Button>
            <Drawer
                isOpen={dialogIsOpen}
                width={1300}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <div className="mx-auto p-6 shadow-md rounded-md  font-mont ">
                    <div className="w-full flex flex-row">
                        <div className="flex flex-col   justify-center gap-6 w-8/12">
                            <h2 className="text-2xl font-bold mb-6">Foydalanuvchi yaratish</h2>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                                className="w-6/12 "
                            >

                                {({ setFieldValue, values, errors }) => {
                                    console.log(errors);

                                    const relatives = values.relatives

                                    return (<Form className='flex flex-row flex-wrap flex-2 gap-4'>
                                        <div className="mb-4 w-5/12">
                                            <label htmlFor="full_name" className="block text-sm font-medium">
                                                To'liq ism
                                            </label>
                                            <Field
                                                type="text"
                                                autoComplete={"off"}
                                                id="full_name"
                                                name="full_name"
                                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:border-blue-300 bg-transparent "
                                            />
                                            <ErrorMessage
                                                name="full_name"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>

                                        <div className="mb-4 w-5/12">
                                            <label htmlFor="phone_number" className="block text-sm font-medium">
                                                Telefon raqam
                                            </label>
                                            <Field
                                                type="text"
                                                autoComplete={"off"}
                                                id="phone_number"
                                                name="phone_number"
                                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:border-blue-300 bg-transparent "
                                            />
                                            <ErrorMessage
                                                name="phone_number"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>
                                        <div className="mb-4 w-5/12">
                                            <label htmlFor="instagram" className="block text-sm font-medium">
                                                Instagram hisobi
                                            </label>
                                            <Field
                                                type="text"
                                                autoComplete={"off"}
                                                id="instagram"
                                                name="instagram"
                                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:border-blue-300 bg-transparent "
                                            />
                                            <ErrorMessage
                                                name="instagram"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>
                                        <div className="mb-4 w-5/12">
                                            <label htmlFor="birthday" className="block text-sm font-medium">
                                                Tug'ilgan kun
                                            </label>

                                            <input type="date" defaultValue={initialValues.birthday}
                                                id="birthday" name='birthday'
                                                className='mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:border-blue-300 bg-transparent' />

                                            <ErrorMessage
                                                name="birthday"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>

                                        <div className="mb-4 w-5/12">
                                            <label htmlFor="region" className="block text-sm font-medium">
                                                Region
                                            </label>
                                            <Field
                                                type="text"
                                                autoComplete={"off"}
                                                id="region"
                                                name="region"
                                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:border-blue-300 bg-transparent "
                                            />
                                            <ErrorMessage
                                                name="region"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>

                                        <div className="mb-4 w-5/12">
                                            <label htmlFor="gender" className="block text-sm font-medium">
                                                Jinsingiz
                                            </label>


                                            <Field
                                                as="select"
                                                id="gender"
                                                name="gender"
                                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:border-blue-300 bg-transparent "
                                            >
                                                <option value="">Jinsingizni tanlang</option>
                                                <option value="men">Erkak</option>
                                                <option value="women">Ayol</option>
                                            </Field>
                                            <ErrorMessage
                                                name="gender"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>
                                        <div
                                            className="w-full"
                                        >

                                            <FieldArray name="relatives">
                                                {({ form, remove, push }) => (
                                                    <div >
                                                        {relatives && relatives.length > 0
                                                            ? relatives.map((_, index) => {
                                                                const nameFeedBack =
                                                                    fieldFeedback(
                                                                        form,
                                                                        `relatives[${index}].full_name`
                                                                    )
                                                                const regionFeedBack =
                                                                    fieldFeedback(
                                                                        form,
                                                                        `relatives[${index}].region`
                                                                    )
                                                                const phoneNumberFeedback =
                                                                    fieldFeedback(
                                                                        form,
                                                                        `relatives[${index}].phone_number`
                                                                    )
                                                                const birthdayFeedBack =
                                                                    fieldFeedback(
                                                                        form,
                                                                        `relatives[${index}].birthday`
                                                                    )
                                                                const relationshipTypeFeedback =
                                                                    fieldFeedback(
                                                                        form,
                                                                        `relatives[${index}].relationshipType`
                                                                    )



                                                                return (
                                                                    <div key={index} className='flex items-center  w-full' >
                                                                        <FormContainer layout="inline">
                                                                            <FormItem
                                                                                label="Yaqinligi"
                                                                                invalid={
                                                                                    relationshipTypeFeedback.invalid
                                                                                }
                                                                                className="flex flex-col"
                                                                                errorMessage={
                                                                                    relationshipTypeFeedback.errorMessage
                                                                                }
                                                                            >
                                                                                <Field
                                                                                    invalid={
                                                                                        relationshipTypeFeedback.invalid
                                                                                    }
                                                                                    placeholder="Relation title"
                                                                                    name={`relatives[${index}].relationshipType`}
                                                                                    type="text"
                                                                                    component={
                                                                                        Input
                                                                                    }
                                                                                />
                                                                            </FormItem>
                                                                            <FormItem
                                                                                label="Full name"
                                                                                invalid={
                                                                                    nameFeedBack.invalid
                                                                                }
                                                                                className="flex flex-col"
                                                                                errorMessage={
                                                                                    nameFeedBack.errorMessage
                                                                                }
                                                                            >
                                                                                <Field
                                                                                    invalid={
                                                                                        nameFeedBack.invalid
                                                                                    }
                                                                                    placeholder="User Name"
                                                                                    name={`relatives[${index}].full_name`}
                                                                                    type="text"
                                                                                    component={
                                                                                        Input
                                                                                    }
                                                                                />
                                                                            </FormItem>
                                                                            <FormItem
                                                                                label="Birthday"
                                                                                className="flex flex-col"
                                                                                invalid={
                                                                                    birthdayFeedBack.invalid
                                                                                }
                                                                                errorMessage={
                                                                                    birthdayFeedBack.errorMessage
                                                                                }
                                                                            >


                                                                                <div>
                                                                                    <input type="date" defaultValue={relatives[index].birthday}
                                                                                        id={`${relatives[index].birthday}`} name={`${relatives[index].birthday}`}
                                                                                        className='mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:border-blue-300 bg-transparent' />

                                                                                    <ErrorMessage
                                                                                        name={`relatives[${index}].birthday`}
                                                                                        component="div"
                                                                                        className="text-red-500 text-sm mt-1"
                                                                                    />
                                                                                </div>
                                                                            </FormItem>
                                                                            <FormItem
                                                                                label="Region"
                                                                                className="flex flex-col"
                                                                                invalid={
                                                                                    regionFeedBack.invalid
                                                                                }
                                                                                errorMessage={
                                                                                    regionFeedBack.errorMessage
                                                                                }
                                                                            >
                                                                                <Field
                                                                                    invalid={
                                                                                        regionFeedBack.invalid
                                                                                    }
                                                                                    placeholder="Region"
                                                                                    name={`relatives[${index}].region`}
                                                                                    type="text"
                                                                                    component={
                                                                                        Input
                                                                                    }
                                                                                />
                                                                            </FormItem>


                                                                            <FormItem
                                                                                label="Phone number"
                                                                                className="flex flex-col"
                                                                                invalid={
                                                                                    phoneNumberFeedback.invalid
                                                                                }
                                                                                errorMessage={
                                                                                    phoneNumberFeedback.errorMessage
                                                                                }
                                                                            >
                                                                                <Field
                                                                                    invalid={
                                                                                        phoneNumberFeedback.invalid
                                                                                    }
                                                                                    className="flex flex-col"
                                                                                    placeholder="Phone Number"
                                                                                    name={`relatives[${index}].phone_number`}
                                                                                    type="text"
                                                                                    component={
                                                                                        Input
                                                                                    }
                                                                                />
                                                                            </FormItem>
                                                                            <Button
                                                                                shape="circle"
                                                                                // size="sm"
                                                                                icon={
                                                                                    <HiMinus />
                                                                                }
                                                                                onClick={() =>
                                                                                    remove(
                                                                                        index
                                                                                    )
                                                                                }
                                                                            />
                                                                        </FormContainer>
                                                                    </div>
                                                                )
                                                            })
                                                            : null}
                                                        <div>
                                                            <Button
                                                                type="button"
                                                                className="ltr:mr-2 rtl:ml-2"
                                                                onClick={() => {
                                                                    push({
                                                                        full_name: "",
                                                                        phone_number: "",
                                                                        birthday: "",
                                                                        region: "",
                                                                    })
                                                                }}
                                                            >
                                                                Yaqinlar qo'shish
                                                            </Button>
                                                            {/* <Button
                                                            type="submit"
                                                            variant="solid"

                                                        >
                                                            Submit
                                                        </Button> */}
                                                        </div>
                                                    </div>
                                                )}
                                            </FieldArray>
                                        </div>
                                        <div className="text-center my-5">
                                            <Button
                                                variant="solid"
                                                disabled={disabled}
                                                type="submit"
                                                className="ltr:mr-2 rtl:ml-2"
                                            >
                                                Saqlash
                                            </Button>
                                        </div>
                                    </Form>)
                                }}

                            </Formik>
                        </div>
                        <div className="w-4/12 flex flex-col   justify-start gap-6 ">
                            <SaleForm disabled={diableFor} />
                        </div>
                    </div>
                </div>
            </Drawer>
            <ToastWrapper />
        </div>
    )
}

export default CreateUser