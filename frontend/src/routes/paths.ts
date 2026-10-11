
export interface IPaths {
    website: {
        home: string;
    },
    auth: {
        login: string;
    }
}

export const paths : IPaths = {
    website: {
        home: "/",
    },
    auth:{
        login: "auth/login",
    }
}
