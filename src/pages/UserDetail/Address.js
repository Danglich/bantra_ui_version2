import React, { useState, useEffect } from 'react';
import AddressItem from './AddressItem';
import AddressForm from './AddressForm';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { apiUrl } from '../../constants';

function Address() {
    const [addresses, setAddresses] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axios
            .get(`${apiUrl}/api/users/${user?.id}/addresses`)
            .then((response) => {
                setAddresses(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [user]);

    return (
        <div className="max-w-[500px] ml-[36px] mt-[12px] ">
            <h1 className="text-2xl font-bold mb-4">Sổ địa chỉ</h1>
            <ul>
                {addresses.map((address) => (
                    <li key={address.id}>
                        <AddressItem address={address} />
                    </li>
                ))}
            </ul>
            <div className="bg-[#f0f0f0] px-[16px] py-[12px] rounded-[4px] mt-[12px]">
                <AddressForm />
            </div>
        </div>
    );
}

export default Address;
