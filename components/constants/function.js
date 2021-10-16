import { getApi } from "../../configApi";

export const getInfoUser= async (id) =>{
    const result = await getApi.get(`user/get-one-info?id=${id}`)
    .catch(error => {
      error.response &&
        ToastAndroid.showWithGravity(
          `${error.response.data.errors.message}`,
          5,
          ToastAndroid.CENTER
        );
    })
    return result.data.data
}