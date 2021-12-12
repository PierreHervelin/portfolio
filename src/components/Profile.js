import React from 'react';
import { Me } from '../core/main';
import TitleRandomEffect from './TitleRandomEffect';

const Profile = () => {
    console.log(Me);
    return (
        <div className='Profile'>
            <TitleRandomEffect text={`${Me.firstName} ${Me.lastName}`} />
            <TitleRandomEffect text={`Age : ${Me.age}`} />
            <TitleRandomEffect text={`Location : ${Me.location}`} />
            <TitleRandomEffect text={`Number : ${Me.contact.number}`} />
            <TitleRandomEffect text={`Mail : ${Me.contact.mail}`} />
        </div>
    );
};

export default Profile;