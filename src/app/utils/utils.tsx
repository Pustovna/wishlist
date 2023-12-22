import { getThink, getWishList } from "@/services/Firebase";

export default async function getFullThink(userId: string) {
  return new Promise((resolve, reject) => {
    let fullWish: any[] = [];
    getWishList(userId)
      .then((res) => {
        if (!res) {
          reject("not result");
        }
        fullWish = [...res?.list];

        const thinkPromises = fullWish.map((item) => {
          return getThink(item.id).then((res) => {
            item.name = res?.name;
            item.link = res?.link;
            item.picture = res?.picture;
          });
        });

        Promise.all(thinkPromises)
          .then(() => {
            resolve(fullWish);
          })
          .catch((err) => {
            reject("error in getThink");
          });
      })
      .catch((err) => {
        reject("error in getWishList");
      });
  });
}
