import Hero from "~/components/Hero";
import { Outlet } from "react-router";

const HomeLayout = () =>  {
    return (
        <>
        <Hero name="Pedro Orellana"/>
        <section  className="max-w-6xl mx-auto px-6 my-8">
           <Outlet/>
        </section>
        </>
    )
}


export default HomeLayout;