import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

const CollectionCard = ({product}) => {
    return (
        <div>
            <Card>
  <CardHeader>
    <CardTitle> {product?.title} </CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <img src={product?.image} className='h-[300px] object-cover w-full'/>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>

        </div>
    );
};

export default CollectionCard;