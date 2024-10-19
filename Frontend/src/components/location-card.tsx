import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "../app/lib/utils";
import Image from "next/image";

interface Props {
  image?: string;
  href?: string;
  title: string;
  className?: string;
  description?: string;
  rating: number;
  stars: number;
}

const LocationCard = ({
  image,
  href,
  title,
  className,
  description,
  rating,
  stars,
}: Props) => {
  return (
    <div>
      <Card
        className={
          "flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full"
        }
      >
        <Link
          href={href || "#"}
          className={cn("block cursor-pointer", className)}
        >
          {image && (
            <img
              src={image}
              alt={title}
              width={500}
              height={300}
              className="h-40 min-w-fit overflow-hidden object-cover object-top"
            />
          )}
        </Link>
        <CardHeader className="px-2">
          <div className="space-y-1">
            <CardTitle className="mt-1 text-base">{title}</CardTitle>
            <p className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
              {description}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex">
            <div>{rating}</div>
            <div>{stars}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationCard;
