import { useEffect } from "react";
import { useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {

  const [services,setServices] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:5000/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
      })
      .catch((error) => {
        console.error(error);
      });

  },[])

  return (
    <div>
      <div className="text-center w-2/3  mx-auto space-y-4">
        <h3 className="text-2xl font-bold text-[#FF3811]">Our Services</h3>
        <h2 className="text-5xl font-bold">Our Services Area</h2>
        <p>
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.{" "}
        </p>
      </div>
      <div className="grid mt-10 grid-cols-1 ga6 lg:grid-cols-3 md:grid-cols-2 gap-6">
        {
          services.map(service=><ServiceCard key={service._id} service={service} />)
        }
      </div>
    </div>
  );
}

export default Services