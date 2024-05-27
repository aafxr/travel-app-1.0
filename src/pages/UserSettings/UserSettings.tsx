import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";

import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {CurrencyCodeTOSymbol, CurrencyType} from "../../types/CurrencyType";
import {CURRENCY_CODE_LIST, CURRENCY_SYMBOL_LIST} from "../../constants";
import {DefaultThemeType} from "../../contexts/ThemeContextProvider";
import {useAppDispatch, useUser} from "../../hooks/redux-hooks";
import {useAppContext} from "../../contexts/AppContextProvider";
import {UserController} from "../../core/service-controllers";
import Container from "../../components/Container/Container";
import {DropDown, PageHeader} from "../../components/ui";
import Button from "../../components/ui/Button/Button";
import {setUser} from "../../redux/slices/user-slice";
import {ValueOfType} from "../../types/ValueOfType";
import {useTheme} from "../../hooks/theme";
import {useHasChanges} from "../../hooks";
import {User} from "../../core/classes";

import './UserSettings.css'
import {Currency} from "../../core/classes/store/Currency";

export function UserSettings() {
    const context = useAppContext()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const {user} = useUser()
    const [tmpUser, setTmpUser] = useState<User>()
    const hasChanges = useHasChanges(user, tmpUser)

    const {theme, defaultThemeList, setTheme} = useTheme()

    const [currencyOpen, setCurrencyOpen] = useState(false)
    const currencyRef = useRef<HTMLSpanElement>(null)

    const [themeOpen, setThemeOpen] = useState(false)
    const themeRef = useRef<HTMLSpanElement>(null)

    const [saving, setSaving] = useState(false)


    useEffect(() => {
        if (user) setTmpUser(new User(user))
    }, []);


    function handleCurrencyChange(val: string) {
        if (!tmpUser) return
        const code = val as CurrencyType['symbol']
        const u = new User(tmpUser)
        const c = CURRENCY_CODE_LIST.find(c => CurrencyCodeTOSymbol[c] === code)
        if (c) {
            u.settings.currency = c
            setTmpUser(u)
            setCurrencyOpen(false)
        }
    }


    function handleThemeChange(t: string) {
        setTheme(t as DefaultThemeType)
        setThemeOpen(false)
    }


    function handleSaveChanges() {
        if (!tmpUser) return
        setSaving(true)
        UserController.update(context, tmpUser)
            .then(() => dispatch(setUser(tmpUser)))
            .then(() => navigate('/profile/'))
            .catch(defaultHandleError)
            .finally(() => setSaving(false))
    }


    if (!tmpUser) return null

    return (
        <div className='wrapper'>
            <Container>
                <PageHeader arrowBack title={'Настройки'}/>
            </Container>
            <Container className='content column gap-1'>
                <div className='option'>
                    <span className='option-title'>Валюта: </span>
                    <span
                        ref={currencyRef}
                        className='option-select'
                        onClick={() => setCurrencyOpen(!currencyOpen)}
                    >{Currency.getSymbolByCode(tmpUser.settings.currency)}</span>
                </div>
                <DropDown
                    max={5}
                    visible={currencyOpen}
                    onVisibleChange={setCurrencyOpen}
                    onSubmit={handleCurrencyChange}
                    node={currencyRef}
                    items={CURRENCY_SYMBOL_LIST}
                />
                <div className='option'>
                    <span className='option-title'>Тема: </span>
                    <span
                        ref={themeRef}
                        className='option-select'
                        onClick={() => setThemeOpen(!themeOpen)}
                    >{theme}</span>
                </div>
                <DropDown
                    max={3}
                    visible={themeOpen}
                    onVisibleChange={setThemeOpen}
                    onSubmit={handleThemeChange}
                    node={themeRef}
                    items={defaultThemeList}
                />
            </Container>
            <div className='footer-btn-container footer'>
                <Button
                    onClick={handleSaveChanges}
                    loading={saving}
                    disabled={hasChanges || saving}
                >Сохранить</Button>
            </div>
        </div>
    )
}
