import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext'
import { useGetUsers } from '../../../hooks/useUsers';
const PageUsers = () => {
    const [visibleCreate, setVisibleCreate] = useState(false);
    const [isVisible, setIsVisible] = useState(false)
    const { register: createRegister, handleSubmit: createHandleSubmit } = useForm();
    const { data: usuarios, isLoading } = useGetUsers();
    const createUser = (data) => {
        console.log(data);
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
                <Column header={'Ações'} bodyClassName={'w-1'} body={() => (
                    <div className='flex gap-3'>
                        <Button rounded icon={'pi pi-pencil'} />
                        <Button rounded icon={'pi pi-trash'} />
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
            {/* <Sidebar
                visible={visibleCreate}
                onHide={() => setVisibleCreate(false)}
                position={'right'}>
                alguma coisa edit
            </Sidebar> */}
        </>
    )
}

export default PageUsers;