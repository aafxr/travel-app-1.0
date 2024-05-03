import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {SectionController} from "../../core/service-controllers/SectionController";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {useLimitContext} from "../../contexts/LimitContextProvider";
import {useLimitSubject} from "../../contexts/SubjectContextProvider";
import {useAppContext} from "../../contexts/AppContextProvider";
import Container from "../../components/Container/Container";
import {Chip, PageHeader} from "../../components/ui";
import {Limit, Section} from "../../core/classes";

export function LimitAdd(){
    const context = useAppContext()
    const {travelCode, sectionCode} = useParams()
    const [sections, setSections] = useState<Section[]>([])
    const [limit, setLimit] = useState<Limit>(new Limit({primary_entity_id: travelCode, section_id: sectionCode}))
    const limits = useLimitContext()
    const limitSubject = useLimitSubject()


    useEffect(() => {
        SectionController.readAll(context)
            .then(setSections)
            .catch(defaultHandleError)
    }, []);


    useEffect(() => {
    }, []);


    function handleSectionChange(section: Section){

    }


    return (
        <div className='wrapper'>
            <Container>
                <PageHeader arrowBack title={'Добавить расходы'}/>
            </Container>
            <Container className='content'>
                <section className='block column gap-1'>
                    <div className='title-bold'>Категории</div>
                    <div className='flex-wrap gap-1'>
                        {sections.map(s => (
                            <Chip
                                key={s.id}
                                rounded
                                onClick={() => handleSectionChange(s)}
                                color={expense.section_id === s.id ? "orange" : "grey"}
                            >{s.title}</Chip>
                        ))}
                    </div>
                </section>
                <section className='column block gap-1'>
                </section>
            </Container>
        </div>
    )
}