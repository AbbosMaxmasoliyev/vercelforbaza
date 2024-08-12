import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FormContainer from 'components/ui/Form/FormContainer'; // Sizning komponent kutubxonangiz
import FormItem from 'components/ui/Form/FormItem'; // Sizning komponent kutubxonangiz
import Input from "components/ui/Input"
import { Button } from 'components/ui';
import { productCreate } from 'services/product.service';
import { openNotification } from 'utils/notification';
import ToastWrapper from 'components/ui/toast/ToastWrapper';
const validationSchema = Yup.object().shape({
    information: Yup.string().required("Informatiya kiritilishi majburiy"),
    price: Yup.string().required("Narx kitilishi shart")
});

const MyForm = ({ disabled, id, submitNext }) => {
    const initialValues = {
        information: "",
        price: "",
    };

    const handleSubmit = async (values) => {
        try {
            let response = await productCreate({ ...values, clientID: id })
            console.log(response);
            
            if (response.data.ok) {
                openNotification("success", "Buyurtma muvaffaqqiyaltli yaratildi")
                submitNext()
            }
        } catch (error) {
            openNotification("danger", "Buyurtma yaratishda xatolik")
        }
    };

    return (
        <>
            <h4 className='text-xl font-bold mb-6'>Buyurtma yaratish</h4>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched }) => (
                    <Form>
                        <FormContainer layout="vertical" className="flex flex-row gap-2">
                            <FormItem
                                label="Malumot"
                                className="grid grid-rows-2"
                            >
                                <Field
                                    placeholder="Informatsiya"
                                    name={`information`}
                                    type="text"
                                    component={Input}
                                />
                                <ErrorMessage name={`information`} component="div" className="text-red-500 " />
                            </FormItem>
                            <FormItem
                                label="Narxi"
                                className="grid grid-rows-2"
                            >
                                <Field
                                    placeholder="Narxi"
                                    name={`price`}
                                    type="text"
                                    component={Input}
                                />
                                <ErrorMessage name={`price`} component="div" className="text-red-500 " />
                            </FormItem>

                        </FormContainer>
                        <Button disabled={disabled} className="disabled:bg-slate-800" type="submit">Yuborish</Button>
                    </Form>
                )}
            </Formik>
            <ToastWrapper />
        </>
    );
};

export default MyForm;
