import axios from "axios";

const getUser = async (username: string) => {
    try {
        const responseUser = await axios({
            url: process.env.NEXT_PUBLIC_URL + "/api/userExists",
            method: "POST",
            data: {
                username: username,
            },
        });
        const user = responseUser.data.user;
        if (!user || !user.id || !user.username) {
            return null;
        }
        return user;
    } catch (e) {
        console.error(e);
        return null;
    }
};

const getUserLists = async (user: { username: string; id: number }) => {
    try {
        const responseLists = await axios({
            url: process.env.NEXT_PUBLIC_URL + `/api/lists/user/${user.id}`,
            method: "GET",
        });
        const lists = responseLists.data.lists;
        if (!lists || responseLists.status >= 300) {
            return null;
        }
        return lists;
    } catch (e) {
        console.error(e);
        return null;
    }
};

export { getUser, getUserLists };
