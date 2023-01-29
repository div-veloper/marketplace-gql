import type { NextPage } from 'next';
import NewShopForm from '../components/NewShopForm';
import { getAccessToken } from '@auth0/nextjs-auth0';
import { gql, useQuery } from '@apollo/client';
import { useUser } from '@auth0/nextjs-auth0/client';
import ShopList from '../components/ShopList';

const GET_SHOPS_BY_OWNER = gql`
    query getShopsByOwnerId($ownerId: String!) {
        getShopsByOwnerId(ownerId: $ownerId) {
            data {
                _id
                name
            }
        }
    }
`;

const ManageShops: NextPage = (props: any) => {
    const { user } = useUser();

    const { data } = useQuery(GET_SHOPS_BY_OWNER, {
        variables: { ownerId: user?.sub }
    });

    return (
        <>
            <NewShopForm accessToken={props.accessToken} />
            {
                data ? (
                    <ShopList accessToken={props.accessToken} shops={data.getShopsByOwnerId.data} />
                ) : (
                    <div> Loading ... </div>
                )
            }
        </>
    )
}

export default ManageShops

export async function getServerSideProps(ctx: any) {
    const { accessToken } = await getAccessToken(ctx.req, ctx.res);
    console.log('Token')
    console.log(accessToken)

    return {
        props: {
            accessToken,
        }
    }
}