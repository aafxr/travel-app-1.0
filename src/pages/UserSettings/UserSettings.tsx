import {useEffect, useRef, useState} from "react";
import {CURRENCY_CURRENCY_LIST, CURRENCY_SYMBOL_LIST} from "../../constants";
import {CurrencyCodeTOSymbol, CurrencyType} from "../../types/CurrencyType";
import Container from "../../components/Container/Container";
import {DropDown, PageHeader} from "../../components/ui";
import Button from "../../components/ui/Button/Button";
import {ValueOfType} from "../../types/ValueOfType";
import {useUser} from "../../hooks/redux-hooks";
import {User} from "../../core/classes";

import './UserSettings.css'

export function UserSettings(){
    const {user} = useUser()
    const [tmpUser, setTmpUser] = useState<User>()
    const [change, setChange] = useState(false)

    const [ddOpen, setDDOpen] = useState(false)
    const dropDownHeaderRef = useRef<HTMLSpanElement>(null)


    useEffect(() => {
        if(user) setTmpUser(new User(user))
    }, []);



    function handleCurrencyChange(val: string){
        if(!tmpUser) return
        const code = val as CurrencyType['char_code']
        const u = new User(tmpUser)
        u.settings.currency = code
        setTmpUser(u)
        setDDOpen(false)
        if(!change) setChange(true)
    }

    console.log(ddOpen)


    if(!tmpUser) return null

    return (
        <div className='wrapper'>
            <Container>
                <PageHeader arrowBack title={'Настройки'} />
            </Container>
            <Container className='content column'>
                <div
                    className='flex-between'
                    onClick={() => setDDOpen(true)}
                >
                    <span>Валюта</span>
                    <span ref={dropDownHeaderRef} className='currency-symbol'>{getDefaultCurrencySymbol(tmpUser)}</span>
                    <DropDown
                        max={5}
                        visible={ddOpen}
                        // onDropDownClose={() => setDDOpen(!ddOpen)}
                        node={dropDownHeaderRef}
                        items={CURRENCY_SYMBOL_LIST}
                        onSelect={handleCurrencyChange}
                        />
                </div>
            </Container>
            <div className='footer-btn-container footer'>
                <Button disabled>Сохранить</Button>
            </div>
        </div>
    )
}

function getDefaultCurrencySymbol(user: User): CurrencyType['symbol']{
    const res =  CURRENCY_SYMBOL_LIST.find(s => s === CurrencyCodeTOSymbol[user.settings.currency])
    return res ? res : "₽" as ValueOfType<typeof CurrencyCodeTOSymbol>
}