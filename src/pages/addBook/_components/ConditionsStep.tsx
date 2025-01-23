import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm, FormProvider, useFormContext, SubmitHandler } from "react-hook-form";

import * as yup from "yup";

type FormData = {
  name: string;
  email: string;
  address: string;
  city: string;
  country: string;
};

const step1Schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

const step2Schema = yup.object().shape({
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
});

const validationSchemas = [step1Schema, step2Schema];

const Step1: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<FormData>();
  console.log(errors)
  return (
    <div>
      <div>
        <label>Name:</label>
        <input {...register("name")} />
        <p>{errors.name?.message}</p>
      </div>
      <div>
        <label>Email:</label>
        <input {...register("email")} />
        <p>{errors.email?.message}</p>
      </div>
    </div>
  );
};

const Step2: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<FormData>();
  return (
    <div>
      <div>
        <label>Address:</label>
        <input {...register("address")} />
        <p>{errors.address?.message}</p>
      </div>
      <div>
        <label>City:</label>
        <input {...register("city")} />
        <p>{errors.city?.message}</p>
      </div>
      <div>
        <label>Country:</label>
        <input {...register("country")} />
        <p>{errors.country?.message}</p>
      </div>
    </div>
  );
};

const Step3: React.FC<{ data: FormData }> = ({ data }) => (
  <div>
    <h3>Review Your Information</h3>
    <p><strong>Name:</strong> {data.name}</p>
    <p><strong>Email:</strong> {data.email}</p>
    <p><strong>Address:</strong> {data.address}</p>
    <p><strong>City:</strong> {data.city}</p>
    <p><strong>Country:</strong> {data.country}</p>
  </div>
);

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const methods = useForm<FormData>({
    resolver: yupResolver(validationSchemas[step] as yup.ObjectSchema<any>),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      country: "",
    },
  });

  const { handleSubmit, watch, trigger } = methods;
  const formData = watch();

  const nextStep = async () => {
    const valid = await trigger();
    if (valid) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form Submitted", data);
    alert("Form Submitted Successfully");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 0 && <Step1 />}
        {step === 1 && <Step2 />}
        {step === 2 && <Step3 data={formData} />}

        <div style={{ marginTop: "20px" }}>
          {step > 0 && <button type="button" onClick={prevStep}>Back</button>}
          {step < 2 && <button type="button" onClick={nextStep}>Next</button>}
          {step === 2 && <button type="submit">Submit</button>}
        </div>
      </form>
    </FormProvider>
  );
};

export default MultiStepForm;
