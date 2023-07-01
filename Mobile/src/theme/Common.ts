import {StyleSheet} from 'react-native'
import buttonStyles from './Buttons'
import {CommonParams} from '../../@types/theme'

export default function <C>({Colors, ...args}: CommonParams<C>) {
    return {
        button: buttonStyles({Colors, ...args}),
        ...StyleSheet.create({
            backgroundPrimary: {
                backgroundColor: Colors.primary,
            },
            backgroundReset: {
                backgroundColor: Colors.transparent,
            },
            textInput: {
                backgroundColor: Colors.inputBackground,
                color: Colors.text,
                height: 45,
                borderRadius: 10,
                paddingStart: 20,
            },
        }),
    }
}

export const handleValidEmail = (val: string, isRequired: boolean = false) => {
    if (val.length == 0 && !isRequired) {
        return true
    }
    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (val.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}
export const getUniqueValue = (data:any) => {
    return  data
}