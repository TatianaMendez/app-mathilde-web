import React, { useState } from "react";
// import "@styles/styleAtoms.css";
import { InputForm, ButtonFormat, PasswordInput, SelectForm, ValidationPassword } from 'ui-mathilde-web';
// Revisar este componente 
import SidebarMth from "@components/organisms/sidebar/sidebar-pro";  

import { RegisterFormService } from "@services/registerService";
import usePasswordValidation from '@hooks/usePasswordValidation';

import { Formik, Form } from 'formik';
import updateUserInfoSchema from '@schema/updateUser';
import updatePasswordSchema from '@schema/updatePasswordSchema';

interface UpdateUserInfoValues {
  name: string;
  firtsName: string;
  company: string;
  role: string;
  email: string;
  phone: string;
}

interface UpdatePasswordValues {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

const SettingsUser: React.FC = () => {
  const { roles } = RegisterFormService;
  const [isEditing, setIsEditing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isUpdatePassword, setIsUpdatePassword] = useState(false);
  const [formSetting, setformSetting] = useState({
    name: "",
    firtsName: "",
    company: "",
    phone: "",
    role: "",
    email: "",
  });

  const { name, firtsName, company, phone, role, email } = formSetting;

  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showError,
    validations
  } = usePasswordValidation();

  const handleUserInfoSubmit = async (values: UpdateUserInfoValues) => {
    try {
      console.log('Valores del formulario de información:', values);
      setformSetting(values);
      setIsEditing(false);
    } catch (error) {
      console.error('Error al actualizar la información:', error);
    }
  };

  const handlePasswordSubmit = async (values: UpdatePasswordValues) => {
    try {
      console.log('Valores del formulario de contraseña:', values);
      setIsVisible(false);
      setIsUpdatePassword(false);
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
    }
  };

  return (
    <div className="min-h-screen w-full flex">
      <SidebarMth />
      <div className="min-h-screen w-full container-space">
        <h1 className="font-bold mb-3">CONFIGURACIÓN</h1>
        <div className="flex flex-col h-3/5">

          <section id="info-basic">
            <Formik
              enableReinitialize
              initialValues={{
                name,
                firtsName,
                company,
                role,
                email,
                phone
              }}
              validationSchema={updateUserInfoSchema}
              onSubmit={handleUserInfoSubmit}
            >
              {(formik) => (
                <Form>
                  <div className="flex gap-5">
                    <div className="w-1/5">
                      <h3 className="mt-6">INFORMACIÓN BÁSICA</h3>
                      <InputForm
                        type="text"
                        placeholder="Nombres"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={!isEditing}
                      />
                      {formik.errors.name && formik.touched.name && (
                        <div className="text-red-500 text-sm my-2">{formik.errors.name}</div>
                      )}

                      <InputForm
                        type="text"
                        placeholder="Apellidos"
                        name="firtsName"
                        value={formik.values.firtsName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={!isEditing}
                      />
                      {formik.errors.firtsName && formik.touched.firtsName && (
                        <div className="text-red-500 text-sm my-2">{formik.errors.firtsName}</div>
                      )}

                      <InputForm
                        type="text"
                        placeholder="Empresa"
                        name="company"
                        value={formik.values.company}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={!isEditing}
                      />
                      {formik.errors.company && formik.touched.company && (
                        <div className="text-red-500 text-sm my-2">{formik.errors.company}</div>
                      )}

                      <SelectForm
                        options={roles}
                        value={formik.values.role}
                        onChange={(e) => formik.setFieldValue('role', e.target.value)}
                        disabled={!isEditing}
                      />
                      {formik.errors.role && formik.touched.role && (
                        <div className="text-red-500 text-sm my-2">{formik.errors.role}</div>
                      )}

                    </div>
                    <div className="w-1/5 flex flex-col justify-between">
                      <div className="">
                        <h3 className="mt-6">INFORMACIÓN CUENTA</h3>
                        <InputForm
                          type="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Correo electrónico"
                          disabled={true}
                        />
                        {formik.errors.email && formik.touched.email && (
                          <div className="text-red-500 text-sm my-2">{formik.errors.email}</div>
                        )}
                        <div className="flex">
                          <h3 className="mt-6">INFORMACIÓN DE CONTACTO</h3>
                        </div>

                        <InputForm
                          type="number"
                          placeholder="Celular"
                          name="phone"
                          minLength={10}
                          maxLength={10}
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          disabled={!isEditing}
                        />
                        {formik.errors.phone && formik.touched.phone && (
                          <div className="text-red-500 text-sm my-2">{formik.errors.phone}</div>
                        )}
                      </div>

                    </div>            
                  </div>
                  <div className="flex gap-5">
                    <div className="w-1/5"></div>
                    <div className="w-1/5">
                      <div className="flex gap-3 w-full items-center justify-end">
                        {isEditing ? (
                          <>
                            <ButtonFormat
                              txtBtn={'Cancelar'}
                              typeButton={'border'}
                              full={false}
                              type={'button'}
                              onClick={() => {
                                setIsEditing(false);
                                formik.resetForm();
                              }}
                            />
                            <ButtonFormat
                              txtBtn={'Guardar'}
                              typeButton={'default'}
                              full={false}
                              type={'submit'}
                              disabled={!formik.isValid || formik.isSubmitting}
                            />
                          </>
                        ) : (
                          <ButtonFormat
                            txtBtn={'Editar'}
                            typeButton={'default'}
                            full={false}
                            type={'button'}
                            onClick={() => setIsEditing(true)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </section>

          <section id="update-password">
            <Formik
              initialValues={{
                currentPassword: '',
                password: '',
                confirmPassword: ''
              }}
              validationSchema={updatePasswordSchema}
              onSubmit={handlePasswordSubmit}
            >
              {(formikProps) => (
                <Form>
                  <div className="flex">
                    <div className="W-2/5"> 
                      <h3 className="mt-6">ACTUALIZAR CONTRASEÑA</h3>
                    </div>
                  </div>
                  <div className="flex gap-5">  
                    <div className="w-1/5">
                      <PasswordInput
                        name="currentPassword"
                        placeholder="Contraseña actual"
                        disabled={!isUpdatePassword}
                        value={formikProps.values.currentPassword}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                      />
                      {formikProps.errors.currentPassword && formikProps.touched.currentPassword && (
                        <div className="text-red-500 text-sm my-2">{String(formikProps.errors.currentPassword)}</div>
                      )}
                      {!isVisible && (
                        <div className="flex gap-3 w-full items-center justify-end">
                          <ButtonFormat
                            txtBtn="Actualizar"
                            typeButton="default"
                            full={false}
                            type="button"
                            onClick={() => {
                              setIsVisible(true);
                              setIsUpdatePassword(true);
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {isVisible && (
                      <div className="w-1/5">
                        <ValidationPassword formik={formikProps} />

                        <div className="flex gap-3 w-full items-center justify-end">
                          <ButtonFormat
                            txtBtn="Cancelar"
                            typeButton="border"
                            full={false}
                            type="button"
                            onClick={() => {
                              setIsVisible(false);
                              setIsUpdatePassword(false);
                              formikProps.resetForm();
                            }}
                          />
                          <ButtonFormat
                            txtBtn="Guardar"
                            typeButton="default"
                            full={false}
                            type="submit"
                            disabled={!formikProps.isValid || formikProps.isSubmitting}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </section>
          
        </div>        
      </div>
    </div>
  );
};

export default SettingsUser;
