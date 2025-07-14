"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import { v4 as uuidv4 } from "uuid";

// Types
interface VariantAttributes {
  [attributeName: string]: string;
}

interface ProductVariant {
  variantId: string;
  attributes: VariantAttributes;
  priceInCents: number;
  stock: number;
  sku?: string;
  imageUrls?: string[];
}

interface Product {
  productName: string;
  slug: string;
  variants: ProductVariant[];
  description?: string;
  category?: string;
}

export default function ProductForm() {
  const { register, control, handleSubmit, getValues } = useForm({
    defaultValues: {
      productName: "",
      slug: "",
      description: "",
      category: "",
      variants: [
        {
          priceInCents: null,
          stock: null,
          attributes: [{ key: "", value: "" }],
        },
      ],
    },
  });

  const { fields: variantFields, append: appendVariant } = useFieldArray({
    control,
    name: "variants",
  });

  const onSubmit = (data: any) => {
    const product: Product = {
      productName: data.productName,
      slug: data.slug,
      description: data.description,
      category: data.category,
      variants: data.variants.map((variant: any) => ({
        variantId: 1,
        attributes: variant.attributes.reduce((acc: any, attr: any) => {
          if (attr.key) acc[attr.key] = attr.value;
          return acc;
        }, {}),
        priceInCents: parseInt(variant.priceInCents),
        stock: parseInt(variant.stock),
      })),
    };
    alert(JSON.stringify(product))
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Add New Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input {...register("productName")} placeholder="Product Name" />
        <Input {...register("slug")} placeholder="Slug (e.g. dog-toy)" />
        <Textarea {...register("description")} placeholder="Description" />
        <Input {...register("category")} placeholder="Category" />

        <h2 className="text-xl font-semibold mt-6">Variants</h2>
        {variantFields.map((variant, variantIndex) => (
          <Card key={variant.id} className="border p-4 space-y-4">
            <CardContent>
              <Input
                {...register(`variants.${variantIndex}.priceInCents`)}
                placeholder="Price in cents"
                type="number"
              />
              <Input
                {...register(`variants.${variantIndex}.stock`)}
                placeholder="Stock"
                type="number"
              />
              <h3 className="font-medium mt-4">Attributes</h3>
              <AttributeFields
                control={control}
                variantIndex={variantIndex}
                register={register}
              />
            </CardContent>
          </Card>
        ))}
        <Button
          type="button"
          onClick={() =>
            appendVariant({
              priceInCents: 0,
              stock: 0,
              attributes: [{ key: "", value: "" }],
            })
          }
        >
          Add Variant
        </Button>
        <Button type="submit" className="w-full mt-6">
          Save Product
        </Button>
      </form>
    </div>
  );
}

function AttributeFields({ control, variantIndex, register }: any) {
  const name = `variants.${variantIndex}.attributes`;
  const { fields, append } = useFieldArray({ control, name });

  return (
    <div className="space-y-2">
      {fields.map((field, attrIndex) => (
        <div key={field.id} className="flex gap-2">
          <Input
            {...register(`${name}.${attrIndex}.key`)}
            placeholder="Attribute (e.g. color)"
          />
          <Input
            {...register(`${name}.${attrIndex}.value`)}
            placeholder="Value (e.g. Red)"
          />
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => append({ key: "", value: "" })}
        className="mt-2"
      >
        Add Attribute
      </Button>
    </div>
  );
}
