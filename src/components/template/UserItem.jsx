import { Button, Dialog, Input, Pagination, Select } from 'components/ui'
import Table from 'components/ui/Table'
import { useEffect, useState } from 'react'
import { BsBasket2Fill, BsPen, BsPenFill } from 'react-icons/bs'
import { CgEditBlackPoint, CgEditExposure, CgEditFlipV, CgEditHighlight, CgEditStraight } from 'react-icons/cg'
import { formattedPhoneNumber } from 'utils/formatted'
import getUpdateInformation from './UpdateForm'
import { clientGetById, createCleint, deleteUser, getUsers } from 'services/client.service'
import { openNotification } from 'utils/notification'
import UpdateUser from './UpdateForm'
import CreateUser from './CreateUser'

const { Tr, Th, Td, THead, TBody } = Table




const pageSizeOption = [
    { value: 100, label: '100 / page' },
    { value: 200, label: '200 / page' },
    { value: 300, label: '300 / page' },
]

const UserItem = () => {
    const [data, setData] = useState(null)





    const [totalIndex, setTotal] = useState(10)
    const [role, setRole] = useState("")
    const [selectValue, setSelectValue] = useState(33)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")



    const [updateData, setUpdateData] = useState(null)
    const [updateId, setUpdateId] = useState(null)
    const [updateShow, setUpdateShow] = useState(false)
    const [deleteData, setDeleteData] = useState({})

    const getClients = async (query) => {
        try {
            let clientsResponse = await getUsers(query)
            console.log(clientsResponse);

            setData(clientsResponse.data.clients)
            setTotal(clientsResponse.data.total)
        } catch (error) {

        }
    }

    useEffect(() => {
        getClients(`?page=${page}&item=${selectValue}`)
    }, [])


    useEffect(() => {
        getClients(`?page=${page}&item=${selectValue}&search=${search}`)
    }, [search])



    useEffect(() => {
        getClients(`?page=${page}&item=${selectValue}${search ? `&search=${search}` : ""}`)
    }, [selectValue, page])

    const getUpdateInformation = async (idData) => {
        try {
            let updateResponse = await clientGetById(idData)
            console.log(updateResponse);
            if (updateResponse.data.relatedClients) {

                setUpdateData(updateResponse.data.relatedClients)
            } else {
                setUpdateData(updateResponse.data.client)
            }
            setUpdateShow(true)
        } catch (error) {
            console.log(error);
            openNotification("error", "Malumotlarni olishda xatolik")
        }
    }
    useEffect(() => {
        if (updateId) {
            getUpdateInformation(updateId)
        } else {
            getUpdateInformation()
        }
    }, [updateId])



    const onDialogClose = () => {
        setDeleteData({})
    }
    const onDialogOk = async () => {
        try {
            let data = await deleteUser(deleteData._id)
            setDeleteData({})
            openNotification("success", "Muvaffaqqiyalti o'chirildi")
            getUpdateInformation()
        } catch (error) {
            openNotification("success", "O'chirishda xatolik")
        }
    }

    const onSelectChange = (value = 0) => {
        setSelectValue(Number(value))
    }

    return (
        <div className='font-mont'>
            <div className="flex flex-row justify-between items-center sticky top-16 bg-gray-800 py-3">
                <h1 className='text-xl font-mont'>Users</h1>
                <div className="flex gap-2">
                    <Input type="text" onBlur={e => {
                        setSearch(e.target.value)
                    }}
                        placeholder="Izlash..."
                        className={"w-32"}
                    />
                    <CreateUser />
                </div>
            </div>
            {
                updateShow && updateData ? <UpdateUser userData={updateData} removeId={setUpdateId} setShow={setUpdateShow} show={updateShow} submitNext={() => {
                    setUpdateData(null)
                    setUpdateShow(null)
                    getClients(`?page=${page}&item=${selectValue}`)
                }} /> : null
            }
            {
                Object.keys(deleteData).length ? <Dialog
                    isOpen={Object.keys(deleteData).length}
                    onClose={onDialogClose}
                    onRequestClose={onDialogClose}
                >
                    <h5 className="mb-4">Foydalanuvchini o'chirmoqchimisiz</h5>
                    <p>
                        Ismi: {deleteData.full_name}
                    </p>
                    <p>
                        Telefoni: {deleteData.phone_number}
                    </p>
                    <p>
                        Tug'ilgan sanasi: {deleteData.birthday}
                    </p>
                    <div className="text-right mt-6">
                        <Button
                            className="ltr:mr-2 rtl:ml-2"
                            variant="plain"
                            onClick={onDialogClose}
                        >
                            Cancel
                        </Button>
                        <Button variant="solid" onClick={onDialogOk}>
                            Okay
                        </Button>
                    </div>
                </Dialog> : null
            }
            <Table overflow="true" className={"mt-6"}>
                <THead>
                    <Tr>
                        <Th>T/r</Th>
                        <Th>F.I.O</Th>
                        <Th>Telefon raqami</Th>
                        <Th>
                            <span className="text-center w-full block">Buyurtmlar soni</span>
                        </Th>
                        <Th>
                            <span className="text-center w-full block">
                                Region
                            </span>
                        </Th>
                    </Tr>
                </THead>
                <TBody>
                    {
                        data?.map((user, index) => {
                            return <Tr>
                                <Td>{((page-1) * (selectValue)) + index+1}</Td>
                                <Td>{user.full_name}</Td>
                                <Td>{formattedPhoneNumber(user.phone_number)}</Td>
                                <Td> <span className="text-center w-full block">{user.region}</span></Td>
                                <Td>
                                    <span className='flex gap-2'>
                                        {user.status ?
                                            <>
                                                <Button variant="danger" size="sm" onClick={() => {
                                                    setUpdateId(user._id)
                                                }} ><BsPen className="text-blue-600" /></Button>
                                                <Button variant="danger" size="sm" ><BsBasket2Fill className="text-red-600" onClick={() => setDeleteData(user)} /></Button>

                                            </> :
                                            <Button variant="danger" size="sm" onClick={() => {
                                                setUpdateId(user._id)
                                            }} ><BsPen className="text-blue-600" /></Button>
                                        }
                                    </span>
                                </Td>
                            </Tr>
                        })
                    }
                </TBody>
            </Table>


            <div className='flex justify-end relative'>
                <Pagination onChange={(value) => {
                    setPage(value)
                }}
                    total={totalIndex / selectValue}
                    currentPage={page}
                />
                <div className='relative w-[120px]'>
                    <div className='absolute top-0'>
                        <Select

                            size="sm"
                            isSearchable={false}
                            value={pageSizeOption.filter(
                                (option) =>
                                    option.value ==
                                    selectValue
                            )}
                            options={pageSizeOption}
                            onChange={(option) => onSelectChange(option?.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserItem