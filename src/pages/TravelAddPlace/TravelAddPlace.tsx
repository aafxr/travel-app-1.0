import {useState} from "react";
import {useNavigate} from "react-router-dom";

import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import PlaceCard from "../../components/cards/PlaceCard/PlaceCard";
import Container from "../../components/Container/Container";
import {CheckIcon, PlusIcon} from "../../components/svg";
import Button from "../../components/ui/Button/Button";
import {Input, PageHeader} from "../../components/ui";
import {useAddPlace} from "../../hooks/handlers";
import {fetchPlaces} from "../../api/fetch";
import {Place} from "../../core/classes";

export function TravelAddPlace(){
    const navigate = useNavigate()
    const handleAddPlace = useAddPlace()
    const [places, setPlaces] = useState<Place[]>([])
    const [selected, setSelected] = useState<Place[]>([])
    const [inputName, setInputName] = useState('')


    async function handleInputChange(text: string){
        const t = text.trim()
        setInputName(t)
        if(t){
            try {
                const resp = await fetchPlaces(t)
                setPlaces(resp.map(p => new Place(p)))
            }catch (e){
                defaultHandleError(e as Error)
            }
        }
    }


    function handleAddPlaceClick(p: Place){
        const idx = selected.findIndex(el => el.id === p.id)
        if(idx === -1){
            setSelected([...selected, p])
        }else{
            const newList = [...selected]
            newList[idx] = p
        }
    }


    function handlePlacesSave(){
        if(selected.length === 0) return
        handleAddPlace(selected)
            .catch(defaultHandleError)
            .finally(() => navigate(-1))
    }


    return (
        <div className='wrapper'>
            <Container className='pb-20'>
                <PageHeader arrowBack title={'добавить локацию'}/>
                <Input value={inputName} onChange={handleInputChange} />
            </Container>
            <Container className='content column gap-1'>
                {places.map(p => (
                    <PlaceCard key={p.id} place={p} onAdd={handleAddPlaceClick}>
                        <div className='add-place-container'>
                            <button
                                className='rounded-btn border'
                                onClick={() => handleAddPlaceClick(p)}
                            >
                                {selected.find(e => e.id === p.id)
                                    ? <CheckIcon className='icon'/>
                                    : <PlusIcon className='icon/2'/>
                                }
                            </button>
                        </div>
                    </PlaceCard>
                ))}
            </Container>
            <div className='footer-btn-container footer'>
                <Button
                    onClick={handlePlacesSave}
                    disabled={!selected.length}>
                    Добавить
                </Button>
            </div>
        </div>
    )

}