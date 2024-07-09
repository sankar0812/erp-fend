import React from 'react'
import { AiOutlineDashboard, AiOutlineFundView } from 'react-icons/ai';
import { BiSolidUserCircle } from 'react-icons/bi';
import { BsFillPersonVcardFill } from 'react-icons/bs';
import { MenuText } from '../Style';

export const RandDRole = (collapsed) => {

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    let items = [
        getItem('Dashboard', '', <AiOutlineDashboard />),

        getItem(<MenuText>{collapsed ? null : 'ERP'}</MenuText>, 'menu', null,
            [
                getItem('R & D', 'sub1', <BiSolidUserCircle />, [

                    getItem('Projects', 'project', <BsFillPersonVcardFill />),
                ]),
                getItem('Resignation', 'resignation', <AiOutlineFundView />),

            ], 'group'),
    ]

  return items;

}

export const randDKeys = ['sub1', 'sub2', 'sub3'];
