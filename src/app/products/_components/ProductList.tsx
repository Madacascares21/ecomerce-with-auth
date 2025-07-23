import { getApolloClient } from "@/server/product/productREST";
import { GET_POST, GetProductsResponse } from "@/server/product/queries";

export default async function ProductList() {
  const client = getApolloClient();
  const { data } = await client.query<GetProductsResponse>({
    query: GET_POST,
  });
console.log(data.products)
  return (
    <div>
      <h1>Posts from Strapi</h1>
      <ul>
        {data.products.map((post) => (
          <li key={post.productName}>
            <h2>{post.productName}</h2>
            {JSON.stringify(post)}
          </li>
        ))}
      </ul>
    </div>
  );
}
