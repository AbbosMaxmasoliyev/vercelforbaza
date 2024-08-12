import { useEffect, useState } from 'react'
import Button from 'components/ui/Buttons'
import Dialog from 'components/ui/Dialog'
import { HiMinus, HiUserCircle } from 'react-icons/hi'
import { Formik, Form, Field, ErrorMessage, FieldArray, getIn } from "formik";
import FormItem from 'components/ui/Form/FormItem'
import * as Yup from "yup";
import { DatePicker, Drawer, FormContainer, Input, Tooltip } from 'components/ui';
import Table from "components/ui/Table"
import { openNotification } from 'utils/notification';
import ToastWrapper from 'components/ui/toast/ToastWrapper';
import SaleForm from './SaleForm';
import { getUsers, updateClient } from 'services/client.service';
import { getStringDate } from 'utils/generate';
import { getProductAll } from 'services/product.service';
import { getTimeValues } from 'components/ui/TimeInput/utils';

const { Tr, Th, Td, THead, TBody } = Table
const UpdateUser = ({ userData, show, setShow, removeId, submitNext }) => {
    console.log(userData);
    const [product, setProduct] = useState(null)

    const initialValues = {
        full_name: userData?.full_name || '',
        phone_number: userData?.phone_number || '',
        birthday: userData?.birthday || '',
        region: userData?.region || '',
        gender: userData?.gender || '',
        instagram: userData?.instagram || '',
        productsId: userData?.productsId || [],
        relatives: [],
    };

    const getProductsForUpdate = async () => {
        try {
            let response = await getProductAll(`clientID=${userData._id}`)
            console.log(response);

            if (response.data) {
                setProduct(response.data.products)
            }
        } catch (error) {
            setProduct(null)
        }
    }


    const validationSchema = Yup.object({
        full_name: Yup.string().required('Ismingizni kiriting'),
        phone_number: Yup.string()
            .matches(/^\d{12}$/, 'Raqam noto\'g\'ri formatda')
            .required('Telefon raqamingizni kiriting'),
        birthday: Yup.string().required("Tu'gilgan kunni kiriting"),
        region: Yup.string().required("Istiqomat qiladigan joyini qo'shing"),
        gender: Yup.string().required('Jinsini tanlang'),
        instagram: Yup.string().required('Instagram hisobini kiriting'),
        relatives: Yup.array().of(
            Yup.object().shape({
                relationshipType: Yup.string().required('Yaqinlik kiritilishi shart'),
                full_name: Yup.string().required('Name required'),
                birthday: Yup.string().required('Birthday required'),
                region: Yup.string().required('Region required'),
                phone_number: Yup.string().required('Phone number required'),
            })
        ),
    });

    const [dialogIsOpen, setIsOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [disableFor, setDisabledFor] = useState(true);



    const onDialogClose = (e) => {
        console.log('onDialogClose', e);
        setShow(false);
        removeId(null)
    };

    useEffect(() => {
        getProductsForUpdate()
        return () => {
            setDisabled(false)
        };
    }, []);

    const onSubmit = async (values, error) => {
        console.log({ values });

        setDisabled(true);
        setDisabledFor(false);
        values.birthday = getStringDate(values.birthday)
        values.relatives = values.relatives.map(relative => {
            relative.birthday = getStringDate(relative.birthday)
            return relative
        })
        try {
            let respUser = await updateClient(userData._id, values);
            console.log(respUser);

            openNotification("success", "User muvaffaqqiyatli yangilandi");
            onDialogClose();
            getUsers(null)
            submitNext()

        } catch (error) {
            openNotification("danger", "Xatolik bor");
        }
        setDisabled(false);
    };

    const fieldFeedback = (form, name) => {
        const error = getIn(form.errors, name);
        const touch = getIn(form.touched, name);
        return {
            errorMessage: error || '',
            invalid: typeof touch === 'undefined' ? false : error && touch,
        };
    };

    return (
        <div>

            <Drawer
                isOpen={show}
                width={1300}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                lockScroll={false}
            >
                <div className="mx-auto p-6 shadow-md rounded-md  font-mont ">
                    <div className="w-full flex flex-row items-start">
                        <div className="flex flex-col justify-center gap-6 w-9/12">
                            <h2 className="text-2xl font-bold mb-6">Foydalanuvchini yangilash</h2>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                                className="w-6/12"
                            >
                                {({ setFieldValue, values, errors }) => {
                                    console.log(errors);

                                    const relatives = values.relatives;

                                    return (
                                        <Form className='flex flex-row flex-wrap flex-2 gap-4'>
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
                                                    Instagram
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

                                                <Field
                                                    type="date"
                                                    defaultValue={initialValues.birthday}
                                                    id="birthday"
                                                    name="birthday"
                                                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:border-blue-300 bg-transparent "
                                                />
                                                {/* <span>{initialValues.birthday}</span> */}

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
                                            <div className="w-full">
                                                {
                                                    userData.relatives?.length ? <div className="flex flex-col">
                                                        <h2 className='my-5'>Qarindoshlar</h2>
                                                        <div className="flex flex-col">
                                                            <Table >
                                                                <THead>
                                                                    <Tr>
                                                                        <Th>Ismi</Th>
                                                                        <Th>Qarindoshligi</Th>
                                                                        <Th>Telefon</Th>
                                                                        <Th>Region</Th>
                                                                    </Tr>
                                                                </THead>
                                                                <TBody>
                                                                    {
                                                                        userData.relatives.map(relative => (
                                                                            <Tr>
                                                                                <Td>{relative.clientID.full_name}</Td>
                                                                                <Td>{relative.relationshipType ? relative.relationshipType : "Beklgilanmagan"}</Td>
                                                                                <Td>{relative.clientID.region}</Td>
                                                                                <Td>{relative.clientID.phone_number}</Td>
                                                                            </Tr>
                                                                        ))
                                                                    }

                                                                </TBody>
                                                            </Table>
                                                        </div>
                                                    </div> : <h3>Yaqinlari bazamizda hozircha yo'q</h3>
                                                }
                                            </div>
                                            <div className="w-full">
                                                <FieldArray name="relatives">
                                                    {({ form, remove, push }) => (
                                                        <div>
                                                            {relatives && relatives.length > 0
                                                                ? relatives.map((_, index) => {
                                                                    const nameFeedBack = fieldFeedback(form, `relatives[${index}].full_name`);
                                                                    const regionFeedBack = fieldFeedback(form, `relatives[${index}].region`);
                                                                    const phoneNumberFeedback = fieldFeedback(form, `relatives[${index}].phone_number`);
                                                                    const birthdayFeedBack = fieldFeedback(form, `relatives[${index}].birthday`);
                                                                    const relationshipTypeFeedback =
                                                                        fieldFeedback(
                                                                            form,
                                                                            `relatives[${index}].relationshipType`
                                                                        )
                                                                    return (
                                                                        <div key={index} className='flex items-center w-full'>
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
                                                                                    invalid={nameFeedBack.invalid}
                                                                                    className="flex flex-col"
                                                                                    errorMessage={nameFeedBack.errorMessage}
                                                                                >
                                                                                    <Field
                                                                                        invalid={nameFeedBack.invalid}
                                                                                        placeholder="User Name"
                                                                                        name={`relatives[${index}].full_name`}
                                                                                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:border-blue-300 bg-transparent "
                                                                                    />
                                                                                </FormItem>

                                                                                <FormItem
                                                                                    label="Region"
                                                                                    invalid={regionFeedBack.invalid}
                                                                                    className="flex flex-col"
                                                                                    errorMessage={regionFeedBack.errorMessage}
                                                                                >
                                                                                    <Field
                                                                                        placeholder="Region"
                                                                                        name={`relatives[${index}].region`}
                                                                                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:border-blue-300 bg-transparent "
                                                                                    />
                                                                                </FormItem>

                                                                                <FormItem
                                                                                    label="Birthday"
                                                                                    invalid={birthdayFeedBack.invalid}
                                                                                    className="flex flex-col"
                                                                                    errorMessage={birthdayFeedBack.errorMessage}
                                                                                >



                                                                                    <input
                                                                                        type="date"
                                                                                        onChange={(e) => setFieldValue(`relatives[${index}].birthday`, e.target.value)}
                                                                                        defaultValue={relatives[index].birthday}

                                                                                        id={`relatives[${index}].birthday`} name={`relatives[${index}].birthday`}
                                                                                        className='mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:border-blue-300 bg-transparent' />
                                                                                    {/* <span>{initialValues.birthday}</span> */}


                                                                                </FormItem>

                                                                                <FormItem
                                                                                    label="Phone Number"
                                                                                    invalid={phoneNumberFeedback.invalid}
                                                                                    className="flex flex-col"
                                                                                    errorMessage={phoneNumberFeedback.errorMessage}
                                                                                >
                                                                                    <Field
                                                                                        placeholder="Phone Number"
                                                                                        name={`relatives[${index}].phone_number`}
                                                                                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:border-blue-300 bg-transparent "
                                                                                    />
                                                                                </FormItem>
                                                                            </FormContainer>
                                                                            <Button
                                                                                size="xs"
                                                                                className="p-0 mb-2 mx-1 bg-transparent hover:bg-transparent text-red-500 hover:text-red-500 shadow-none"
                                                                                variant="plain"
                                                                                onClick={() => remove(index)}
                                                                            >
                                                                                <HiMinus />
                                                                            </Button>
                                                                        </div>
                                                                    );
                                                                })
                                                                : null}
                                                            <div className="flex">
                                                                <Button
                                                                    type="button"
                                                                    size="sm"
                                                                    className="ltr:mr-2 rtl:ml-2"
                                                                    onClick={() =>
                                                                        push({
                                                                            full_name: "",
                                                                            region: "",
                                                                            birthday: "",
                                                                            phone_number: ""
                                                                        })
                                                                    }
                                                                >
                                                                    Add Relative
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </FieldArray>
                                            </div>

                                            <div className="w-full justify-start flex">
                                                <Button
                                                    size="sm"
                                                    className="ltr:mr-2 rtl:ml-2"
                                                    variant="solid"
                                                    loading={disabled}
                                                    disabled={!disableFor}
                                                    type="submit"
                                                >
                                                    Saqlash
                                                </Button>
                                            </div>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </div>
                        <div className="flex flex-col w-3/12">
                            <h3>Buyurtmalari</h3>
                            <div className="flex flex-col my-5 gap-2">
                                {
                                    product?.length && product instanceof Array ?

                                        product.map((product, index) => (

                                            <Tooltip title={product.information} className="w-full border border-red-600">
                                                <div className="flex flex-row border-gray-400 border rounded-lg px-4 gap-3 items-center w-full">
                                                    <p className='text-white text-xl'>{index + 1}.</p>
                                                    <h5>$ {product.price}</h5>
                                                </div>
                                            </Tooltip>

                                        )) : <h6>Buyurtmalar hozircha yo'q</h6>
                                }
                            </div>
                            <SaleForm disabled={false} id={userData._id} submitNext={() => getProductsForUpdate()} />
                        </div>
                    </div>
                </div>
            </Drawer>
            <ToastWrapper />
        </div>
    )
};

export default UpdateUser;
