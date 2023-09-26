
interface CustomerListQuery {
    id: number;
    name: string;
    address: string;
    email: string;
    phone: string;
    iban: string;
    customerCategory: CustomerCategory;
}

interface CustomerCategory { 
    id: number;
    code: string;
    description: string;
}

export default function CustomerListPage() {
    return <>
        <i>Todo customers</i>
    </>
}