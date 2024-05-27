import {useState} from "react";
import {useAppContext} from "../../contexts/AppContextProvider";
import Container from "../../components/Container/Container";
import Button from "../../components/ui/Button/Button";
import {PageHeader} from "../../components/ui";
import {Hotel} from "../../core/classes";

export function TravelAddHotel() {
    const context = useAppContext()
    const [hotels, setHotels] = useState<Hotel[]>([])
    const [selected, setSelected] = useState<Hotel[]>([])
    const [saving, setSaving] = useState(false)



    function handleSaveHotels() {

    }

    return (
        <div className='wrapper'>
            <Container>
                <PageHeader arrowBack title={'Добавить отель'}/>
            </Container>
            <Container className='column'>
                {
                }
            </Container>
            <div className='footer-btn-container footer'>
                <Button
                    onClick={handleSaveHotels}
                    disabled={!!selected.length}
                    loading={saving}
                >
                    Добавить
                </Button>
            </div>
        </div>
    )
}