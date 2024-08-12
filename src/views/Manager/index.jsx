import CreateUser from 'components/template/CreateUser'
import Managers from 'components/template/Managertable'
import UserItem from 'components/template/UserItem'
import React, { useEffect, useState } from 'react'
import { HiUserCircle } from 'react-icons/hi'
import { createCleint, getUsers } from 'services/client.service'




const Users = () => {





    return (
        <div className='flex flex-col'>

            <Managers />

        </div>
    )
}

export default Users