import { Router } from "express";
import { createUserController } from "./useCases/User/Create";
import { listUserController } from "./useCases/User/List";
import { editUserController } from "./useCases/User/Edit";
import { authorization } from "./middlewares/authorization";
import { authentication } from "./middlewares/authentication";
import { removeUserController } from "./useCases/User/Remove";
import { getSessionController } from "./useCases/Session/Get";
import { insertFavoriteController } from "./useCases/Favorite/Insert";
import { getFavoriteController } from "./useCases/Favorite/Get";
import { removeFavoriteController } from "./useCases/Favorite/Remove";

const router = Router();

router.post("/usuario", (request, response, next) => {
    return createUserController.execute(request, response, next);
});

router.get("/usuarios", authentication, authorization, (request, response, next) => {
    return listUserController.execute(request, response, next);
});

router.put("/usuario/:id", authentication, (request, response, next) => {
    return editUserController.execute(request, response, next);
});

router.delete("/usuario/:id", authentication, authorization, (request, response, next) => {
    return removeUserController.execute(request, response, next);
});

router.post("/login", (request, response, next) => {
    return getSessionController.execute(request, response, next);
})

router.get("/teste", authentication, (request, response, next) => {
    return removeUserController.execute(request, response, next);
}
)

router.post("/favoritos", authentication, (request, response, next) => {
    return insertFavoriteController.execute(request, response, next);
})

router.get("/favoritos", authentication, (request, response, next) => {
    return getFavoriteController.execute(request, response, next);
})

router.delete("/favoritos/:idProduct", authentication, (request, response, next) => {
    return removeFavoriteController.execute(request, response, next);
})

export { router };