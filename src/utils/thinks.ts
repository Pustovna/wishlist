import { getThink, getWishList } from "@/services/Firebase";

export default async function getFullThink(userId: string) {
  return new Promise((resolve, reject) => {
    let fullWish: any[] = [];
    getWishList(userId)
      .then((res) => {
        if (!res) {
          reject("Wish list not found");
        }
        fullWish = [...res?.list];

        const thinkPromises = fullWish.map(async (item) => {
          const res = await getThink(item.id);
          item.name = res?.name;
          item.link = res?.link;
          item.picture = res?.picture;
        });

        Promise.all(thinkPromises)
          .then(() => {
            resolve(fullWish);
          })
          .catch((err) => {
            console.log(err);
            reject("error in getThink");
          });
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
