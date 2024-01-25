import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext'
import { useCreateUsers, useDeleteUser, useGetUsers } from '../../../hooks/useUsers';
import { useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
const PageUsers = () => {
    const [visibleCreate, setVisibleCreate] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const { register: createRegister, handleSubmit: createHandleSubmit } = useForm();
    const { register: updateRegister, handleSubmit: updateHandleSubmit, setValue: updateValue } = useForm();
    const { data: usuarios, isLoading } = useGetUsers();
    const { mutateAsync: deletarUsuario } = useDeleteUser();
    const { mutateAsync: criarUsuario } = useCreateUsers();
    const accept = (user_id) => {
        confirmDialog({
            header: "Aviso",
            message: 'Tem certeza que deseja deletar este item?',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                deletarUsuario(user_id, {
                    onSuccess: () => {
                        toast.current.show({
                            severity: 'sucess',
                            summary: 'Aviso:',
                            detail: 'Usuario deletado com sucesso!',
                            life: 3000
                        });
                    },
                    onError: () => {
                        toast.current.show({
                            severity: 'error',
                            summary: 'Aviso:',
                            detail: 'Erro ao deletar usuario!',
                            life: 3000
                        });
                    }
                })
            }
        })
    }
    const toast = useRef(null);

    const createUser = (data) => {
        criarUsuario(data, {
            onSuccess: () => {
                setVisibleCreate(false);
                toast.current.show({
                    severity: 'info',
                    summary: 'sucess',
                    detail: 'Usuario criado com sucesso!',
                    life: 3000
                });
            },
            onError: () => {
                setVisibleCreate(false);
                toast.current.show({
                    severity: 'error',
                    summary: 'sucess',
                    detail: 'Usuario criado com sucesso!',
                    life: 3000
                });
            }
        });

    }

    const updateUser = (data) => {

    }
    return (
        <>
            <div className={'flex justify-content-between mb-4'}>
                <h1>Usuarios</h1>
                <Button onClick={() => setVisibleCreate(true)}>Novo usuario</Button>
            </div>

            <DataTable value={usuarios} loading={isLoading} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]}>
                <Column field="user_id" header="ID" className='mb-3 w-1'></Column>
                <Column field="user_name" header="Nome"></Column>
                <Column field="user_email" header="Email"></Column>
                <Column header={'Ações'} bodyClassName={'w-1'} body={(rowData) => (
                    <div className='flex gap-3'>
                        <Button rounded icon={'pi pi-pencil'}
                            onClick={() => {
                                setIsVisible(true);
                                updateValue('user_name', rowData.user_name);
                                updateValue('user_email', rowData.user_email);
                            }} />
                        <Button rounded icon={'pi pi-trash'} onClick={() => accept(rowData.user_id)} />
                    </div>
                )} />
            </DataTable>

            <Sidebar
                visible={visibleCreate}
                onHide={() => setVisibleCreate(false)}
                position={'right'}>
                <form onSubmit={createHandleSubmit(createUser)}>
                    <label htmlFor="">Nome</label>
                    <InputText
                        id='nome'
                        className='mb-3 w-full'
                        placeholder='Digite seu nome'
                        {...createRegister('user_name', { required: true })}>
                    </InputText>
                    <label htmlFor="">E-mail</label>
                    <InputText
                        id='Email'
                        className='mb-3 w-full'
                        placeholder='Digite seu E-mail'
                        {...createRegister('user_email', { required: true })}>
                    </InputText>
                    <label htmlFor="">Senha</label>
                    <InputText
                        id='senha'
                        type='password'
                        className='mb-3 w-full'
                        placeholder='*******'
                        {...createRegister('user_password', { required: true })}
                    >
                    </InputText>
                    <Button label='Criar'
                        type='submit'
                        className='w-full' />
                </form>
            </Sidebar>
            <ConfirmDialog />
            <Sidebar
                visible={isVisible}
                onHide={() => setIsVisible(false)}
                position={'right'}>
                <form
                    onSubmit={updateHandleSubmit(updateUser())}
                >
                    <label htmlFor="">Nome</label>
                    <InputText
                        id='nome'
                        className='mb-3 w-full'
                        placeholder='Digite seu nome'
                        {...updateRegister('user_name', { required: true })}>
                    </InputText>
                    <label htmlFor="">E-mail</label>
                    <InputText
                        id='Email'
                        className='mb-3 w-full'
                        placeholder='Digite seu E-mail'
                        {...updateRegister('user_email', { required: true })}>
                    </InputText>
                    <label htmlFor="">Senha</label>
                    <InputText
                        id='senha'
                        type='password'
                        className='mb-3 w-full'
                        placeholder='*******'
                        {...updateRegister('user_password')}
                    >
                    </InputText>
                    <Button label='Criar'
                        type='submit'
                        className='w-full' />
                </form>
            </Sidebar>
            <Toast ref={toast} position={'top-center'} />
        </>
    )
}

export default PageUsers;