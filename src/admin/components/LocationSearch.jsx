import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function LocationSearch({ placeholder, onSelect, value }) {

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"; 
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef();
  const containerRef = useRef();
  const skipSearchRef = useRef(false);

  useEffect(() => {
    if (skipSearchRef.current) {
      skipSearchRef.current = false;
      return;
    }

    if (!query) {
      setResults([]);
      setOpen(false);
      return;
    }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const { data } = await axios.get( `${API_URL}/api/search-location`, {
          params: { q: query },
        });
        setResults(data.results || []);
        setOpen(true);
      } catch (err) {
        console.error("Search error:", err);
      }
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    const { lat, lon } = item.position;
    const address = item.address.freeformAddress;
    skipSearchRef.current = true;
    setQuery(address);
    setResults([]);
    setOpen(false);
    onSelect({ lat, lon, address });
  };

  useEffect(() => {
    if (value) {
      skipSearchRef.current = true;
      setQuery(value.address || "");
    } else {
      setQuery("");
    }
  }, [value]);

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <input
        type="text"
        className="input input-bordered w-full"
        placeholder={placeholder || ""}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => {
          if (results.length) setOpen(true);
        }}
        onBlur={() => {
          setTimeout(() => {
            setOpen(false);
          }, 100); 
          // Small timeout to allow clicking result before closing dropdown

          // Also still allow user typing a manual address
          if (
            query &&
            (!results.length || !results.some((r) => r.address.freeformAddress === query))
          ) {
            // Only call onSelect if the query is valid or custom
            onSelect({ lat: value?.lat || null, lon: value?.lon || null, address: query });
          }
        }}
      />

      {open && results.length > 0 && (
        <ul className="absolute z-50 bg-white border w-full mt-1 max-h-60 overflow-auto rounded shadow-lg">
          {results.map((r) => (
            <li
              key={`${r.id}-${r.position.lat}`}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(r)}
            >
              {r.address.freeformAddress}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
