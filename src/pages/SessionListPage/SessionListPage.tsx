import clsx from "clsx";
import {useEffect, useState} from "react";

import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {useLangContext} from "../../contexts/LangContextProvider";
import {useAppContext} from "../../contexts/AppContextProvider";
import {UserController} from "../../core/service-controllers";
import Container from "../../components/Container/Container";
import browserName from "../../utils/browserName";
import {PageHeader} from "../../components/ui";
import {SessionType} from "../../api/fetch";

import './SessionListPage.css'


const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "long",
    year: "2-digit"
}


/**
 * страница отображает активные сессии пользователя
 * @constructor
 */
export function SessionListPage() {
    const lang = useLangContext()
    const context = useAppContext()
    const [loading, setLoading] = useState(false)
    const [sessions, setSessions] = useState<SessionType[]>()


    useEffect(() => {
        tryLoadSessionsList().catch(defaultHandleError)
    }, [])


    async function tryLoadSessionsList(){
        setLoading(true)
        UserController.getSessionList(context)
            .then(l => {
                const idx = l.findIndex(i => i.active)
                if(idx !== -1){
                    const t = l[idx]
                    l[idx] = l[0]
                    l[0] = t
                }
                setSessions(l)
            })
            .catch(defaultHandleError)
            .finally(() => setLoading(false))
    }


    return (
        <div className='wrapper'>
            <Container>
                <PageHeader arrowBack title={lang.activeSessions}/>
            </Container>
            <Container className='content' loading={loading}>
                {sessions ? sessions.map(s => (
                    <div
                        key={s.uid + '-' + s.updated_at.getTime()}
                        className={clsx('session', {active: s.active})}
                    >
                        <div className={clsx('session-browser', browserName(s.created_user_agent).toLowerCase())}/>
                        <div className='session-ip'>
                            {s.created_ip}
                            &nbsp;
                            <span>{s.active ? `(${lang.currentSession})` : ''}</span>
                        </div>
                        <div className='session-location'>
                            {s.update_location}
                        </div>
                        <div className='session-time'>
                            {s.updated_at.toLocaleTimeString(navigator.language, timeOptions)}
                        </div>

                    </div>
                ))
                    : <button
                        className='session-btn'
                        onClick={tryLoadSessionsList}
                        disabled={loading}
                    >{lang.tryAgain}</button>
                }
            </Container>
        </div>
    )
}