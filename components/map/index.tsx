import Spinner from "@components/Spinner";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN || "";

const Map = () => {
    const [isLoaded, setLoaded] = useState<boolean>(false);
    const mapContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapContainer.current) return;
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/digos/clafv45pa000l14sals7h1ijw",
            center: [-74.006, 40.7128],
            zoom: 12,
        });
        map.on('load', () => {
            setLoaded(true)
        })
        return () => map.remove();
    }, []);

    return (
        <>
            {!isLoaded && <Spinner />}
            <div
                className="absolute w-screen h-screen overflow-hidden"
                ref={mapContainer}
            />
        </>
    )
}

export default Map;