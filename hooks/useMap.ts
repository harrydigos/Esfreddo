import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN || "";

export const useMap = <T extends HTMLElement>() => {
    const mapContainerRef = useRef<T>();
    const [isLoaded, setIsLoaded] = useState(false);
    const [map, setMap] = useState<mapboxgl.Map | null>(null);


    const initMap = useCallback((e: T) => {
        const mapConst = new mapboxgl.Map({
            container: e,
            style: "mapbox://styles/digos/clafv45pa000l14sals7h1ijw",
            center: [-74.006, 40.7128],
            zoom: 12,
        });

        mapContainerRef.current = e;

        mapConst.on("load", () => {
            setIsLoaded(true);
            mapConst.addControl(new mapboxgl.NavigationControl(), "bottom-right");
        });

        setMap(mapConst);
    }, [])

    useEffect(() => {
        return () => {
            setMap(null);
        };
    }, [])


    return {
        initMap,
        prev: useMemo(
            () => ({
                mapContainerRef,
                isLoaded,
                map: map,
            }),
            [mapContainerRef, isLoaded, map]
        )
    }
};

export type AppMapType<T extends HTMLElement> = ReturnType<typeof useMap<T>>