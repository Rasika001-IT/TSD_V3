"use client";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";

// import { useRef } from "react";
// import { useRouter } from "next/navigation";

// import Container from "../layout/Container";

// import { magazines } from "../../data/magazines";

// const leftArrow = "/assets/icons/arrow-left.svg";
// const rightArrow = "/assets/icons/arrow-right.svg";

// const Magazine = () => {
//   const prevRef = useRef(null);
//   const nextRef = useRef(null);

//   const navigate = useRouter();

//   // CENTRALIZED DATA SOURCE
//   const magazineItems = magazines.slice(0, 6);

//   return (
//     <section className="bg-[#C89632]/5 py-20">
//       <Container>

//         {/* HEADER */}
//         <div className="text-center mb-12">
//           <span className="bg-[#C89632]/20 text-[#C89632] text-xs px-3 py-1 uppercase tracking-widest">
//             Latest Issues
//           </span>

//           <h2 className="font-heading font-bold text-4xl mt-4">
//             The Magazine
//           </h2>

//           <div className="w-16 h-[2px] bg-[#C89632] mx-auto mt-3"></div>
//         </div>

//         {/* SLIDER */}
//         <div className="relative">

//           {/* LEFT ARROW */}
//           <button
//             ref={prevRef}
//             className="absolute left-[-30px] top-1/2 -translate-y-1/2 z-10"
//           >
//             <img
//               src={leftArrow}
//               className="w-6 h-6 opacity-70 hover:opacity-100 transition"
//               alt="prev"
//             />
//           </button>

//           {/* RIGHT ARROW */}
//           <button
//             ref={nextRef}
//             className="absolute right-[-30px] top-1/2 -translate-y-1/2 z-10"
//           >
//             <img
//               src={rightArrow}
//               className="w-6 h-6 opacity-70 hover:opacity-100 transition"
//               alt="next"
//             />
//           </button>

//           <Swiper
//             modules={[Navigation]}
//             spaceBetween={30}
//             slidesPerView={4}
//             breakpoints={{
//               0: { slidesPerView: 1 },
//               640: { slidesPerView: 2 },
//               1024: { slidesPerView: 4 },
//             }}
//             navigation={{
//               prevEl: prevRef.current,
//               nextEl: nextRef.current,
//             }}
//             onBeforeInit={(swiper) => {
//               swiper.params.navigation.prevEl =
//                 prevRef.current;

//               swiper.params.navigation.nextEl =
//                 nextRef.current;
//             }}
//           >
//             {magazineItems.map((item) => (
//               <SwiperSlide key={item.id}>

//                 <div
//                   onClick={() => {
//                     navigate.push(
//                       `/magazine/${item.slug}`
//                     );
//                   }}
//                   className="text-center cursor-pointer group"
//                 >

//                   {/* COVER */}
//                   <div className="overflow-hidden">
//                     <img
//                       src={item.image}
//                       alt={item.title}
//                       className="
//                         w-full
//                         aspect-[291/372]
//                         object-cover
//                         transition-transform
//                         duration-300
//                         group-hover:scale-105
//                       "
//                     />
//                   </div>

//                   {/* TITLE */}
//                   <h3 className="font-heading font-semibold text-[15px] mt-4 leading-snug px-2 group-hover:text-[#C89632] transition-colors">
//                     {item.title}
//                   </h3>

//                 </div>

//               </SwiperSlide>
//             ))}
//           </Swiper>

//         </div>

//         {/* CTA */}
//         <div className="flex justify-center mt-12">
//           <button className="bg-black text-white px-6 py-3 text-sm rounded-[5px] hover:opacity-80 transition">
//             Subscribe to Print + Digital
//           </button>
//         </div>

//       </Container>
//     </section>
//   );
// };

// export default Magazine;