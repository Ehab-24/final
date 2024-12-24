import { Link, useNavigate } from "react-router-dom";
import Button from "../buttons/Button";

export default function PropertyCard({ listing }: { listing: any }) {

    const navigate = useNavigate()

    return (
        <div className="w-full h-max rounded-lg shadow-2xl shadow-black/10 flex flex-col overflow-hidden">

            <Link to={`/listings/${listing.id}`}>
                <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full aspect-[5/3] object-cover"
                />
            </Link>

            <div className="flex justify-between w-full px-4 mt-6">
                <div className="flex flex-col">
                    <h3 className="text-xl font-medium text-gray-900 leading-relaxed">
                        {listing.title}
                    </h3>
                    <p className="mt-4 text-sm text-gray-500 leading-relaxed tracking-wide">{listing.description}</p>
                    <p className="text-sm text-gray-500 leading-relaxed tracking-wide">{listing.location}</p>
                </div>

                <div className="flex items-center h-min gap-1 min-w-max">
                    <img
                        src="../../../public/star.svg"
                        alt="star"
                        className="w-4 h-4"
                    />
                    <p className="font-medium text-gray-900">{listing.rating}</p>
                </div>
            </div>

            <div className="flex items-center w-full justify-between my-6 px-4">
                <p className="text-xl font-medium text-gray-900">
                    ${listing.price_per_night}
                    <span className="text-sm text-gray-500 leading-relaxed tracking-wide"> / {listing.time}</span>
                </p>

                {
                    listing.isBooked === false ? (
                        <Button onClick={() => navigate(`/book/${listing.id}`)}>
                            Book Now
                        </Button>
                    ) : (
                        "Already booked!"
                    )
                }
            </div>

        </div>
    )
}
