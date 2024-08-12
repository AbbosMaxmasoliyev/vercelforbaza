import CreateUser from 'components/template/CreateUser'
import UserItem from 'components/template/UserItem'
import React, { useEffect, useState } from 'react'
import { HiUserCircle } from 'react-icons/hi'
import { createCleint, getUsers } from 'services/client.service'




const Users = () => {





    return (
        <div className='flex flex-col '>

            <UserItem />

        </div>
    )
}

export default Users