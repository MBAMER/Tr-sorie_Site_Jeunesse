let user = [
    {
        id: 0,
        nom: "Bamert",
        prénom: "Mathieu",
        mail: "mathieu.bamert@gmail.com",
        MDP: "**********",
        jeunesse: "Jeunesse de Cugy"
    },
    {
        id: 1,
        nom: "Wirth",
        prénom: "Kévin",
        mail: "kevin.wirth@gmail.com",
        MDP: "**********",
        jeunesse: "Jeunesse du Mont-sur-Lausanne"
    }
]

const getProduct = (userid) => {
return user.find((user) => user.id == userid);
};

const removeProduct = (userid) => {
users = user.filter((user) => user.id != userid);
};

const updateProduct = (userid, updatedProduct) => {
users = user.map((user) =>
user.id == userid ? updatedProduct : user
);
};

const getUniqueId = () => {
const productsIds = user.map((product) => product.id);
const maxId = productsIds.reduce((a, b) => Math.max(a, b));
const uniqueId = maxId + 1;
return uniqueId;
};
export { user, getProduct, removeProduct, updateProduct, getUniqueId };