import React, {useEffect, useState} from 'react';
import Perks from '../Perks';
import PhotosUploader from '../Photo';
import axios from 'axios';
import { Navigate,useParams } from 'react-router-dom';
import { set } from 'mongoose';


export default function PlacesFormPage(){
    const {id}= useParams();
    const [title, setTitle] = useState('');
    const[address, setAddress] = useState('');
    const[addedPhotos, setAddedPhotos] = useState([]);
    const[photoLink, setPhotoLink] = useState('');
    const[description, setDescription] = useState('');
    const[perks, setPerks] = useState([]);
    const[extraInfo, setExtraInfo] = useState('');
    const[checkIn, setCheckIn] = useState('');
    const[checkOut, setCheckOut] = useState('');
    const[maxGuests, setMaxGuests] = useState(1);
    const[price, setprice] = useState(100);
    const[redirect, setRedirect] = useState(false);

    useEffect(()=>{
        if(!id) return;
        axios.get('/places/'+id).then(({data})=>{
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setprice(data.price);
        });
    },[id]);

    async function savedPlace(ev){
        ev.preventDefault();
        const newPlace= {
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
        };
        if(id){
            await axios.put('/places', {
                id, ...newPlace
            });
            setRedirect(true);
        }else{
            //newplace
            await axios.post('/places', newPlace);
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    
    return (
        <div>
            <form onSubmit={savedPlace}>  
                <h2 className="text-2xl mt-4">Title</h2>
                <p className="text-gray-500 text-sm">Title for your place</p>
                <input className="border rounded-2xl p-1 w-full" type="text" value={title} onChange={ev=> setTitle(ev.target.value)} placeholder="title, for example:My lovely apartment" />

                <h2 className="text-2xl mt-4">Address</h2>
                <p className="text-gray-500 text-sm">Address to this place</p>
                <input value={address} onChange={ev=> setAddress(ev.target.value)} className="border rounded-2xl p-1 w-full" type="text" placeholder="address" />

                <h2 className="text-2xl mt-4">Photos</h2>
                <p className="text-gray-500 text-sm">more==better</p>
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                <h2 className="text-2xl mt-4">Description</h2>
                <p className="text-gray-500 text-sm">Description of place</p>
                <textarea value={description} onChange={ev=>setDescription(ev.target.value)} />
                
                <h2 className="text-2xl mt-4">Perks</h2>
                <p className="text-gray-500 text-sm"> Select all the Perks of your Place</p>

                <div  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-2">
                <Perks selected={perks} onChange={setPerks} />
                </div>

                <h2 className="text-2xl mt-4">ExtraInfo</h2>
                <p className="text-gray-500 text-sm">House rules</p>
                <textarea value={extraInfo} onChange={ev=> setExtraInfo(ev.target.value)}/>

                <h2 className="text-2xl mt-4">Check IN & OUT times</h2>
                <p className="text-gray-500 text-sm">Add check in and out times, remember to have some time window for cleaning the room between the guests</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div>
                        <h3 className="mt-2 -mb-1">Check In Time</h3>
                        <input type="text" placeholder="14:00" value={checkIn} onChange={ev=>setCheckIn(ev.target.value)} />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check Out Time</h3>
                        <input type="text" placeholder="14:00" value={checkOut} onChange={ev=>setCheckOut(ev.target.value)}  />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1"> Max number of guests</h3>
                        <input type="number" placeholder="1" value={maxGuests} onChange={ev=>setMaxGuests(ev.target.value)} />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Price Per Night</h3>
                        <input type="number" placeholder="1" value={price} onChange={ev=>setprice(ev.target.value)} />
                    </div>
                </div>
                    <button className="bg-primary text-white primary">Save</button>
            </form>
            </div>
    );
}