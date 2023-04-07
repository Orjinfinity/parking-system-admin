import { LocalStorageKeys, Types } from "../interfaces";

const getUserApartmentInfo = (flatObj: any) => {
    const flat = { id: flatObj?.id, name: flatObj?.number };
    const block = { id: flatObj?.block?.id, name: flatObj?.block?.name };
    const apartment = { id: flatObj?.block?.apartment?.id, name: flatObj?.block?.apartment?.name }
    return { flat, block, apartment }
}

const getUserIsApartmentAdmin = () => {
    const user = JSON.parse(localStorage.getItem(LocalStorageKeys.User));
    return user.roles.some(role => role === Types.ROLE_APARTMENTADMIN) && user?.apartment && !!Object.values(user.apartment);
}

const getApartmentIdForAdmin = () => {
    const user = JSON.parse(localStorage.getItem(LocalStorageKeys.User));
    return user?.apartment?.apartment || null;
}

export { getUserApartmentInfo, getUserIsApartmentAdmin, getApartmentIdForAdmin };