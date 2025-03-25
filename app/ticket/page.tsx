"use client";
export const dynamic = 'force-dynamic';
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

const Button = (
  props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
) => (
  <button
    {...props}
    className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded ${props.className || ""}`}
  >
    {props.children}
  </button>
);

  

export default function TicketPage() {
  const router = useRouter();
  const [ticket1, setTicket1] = useState("");
  const [ticket2, setTicket2] = useState("");
  const [ticket2Submitted, setTicket2Submitted] = useState(false);
  const [ticket1Submitted, setTicket1Submitted] = useState(false);
  const [showWrongBubble, setShowWrongBubble] = useState(false);
  const [showHowBubble, setShowHowBubble] = useState(false);
  const [registerHoverCount, setRegisterHoverCount] = useState(0);
  const hoverCount1 = useRef(0);
  const hoverCount2 = useRef(0);
  const [hideWholeBox1, setHideWholeBox1] = useState(false);
  const [hideWholeBox2, setHideWholeBox2] = useState(false);

  const devCount = useRef(Math.floor(Math.random() * 20) + 1);
  const desCount = useRef(Math.floor(Math.random() * 20) + 1);
  const proCount = useRef(Math.floor(Math.random() * 20) + 1);
  const genCount = useRef(Math.floor(Math.random() * 20) + 1);
  
  const totalDivisor = devCount.current + desCount.current + proCount.current + genCount.current;

  const handleSubmit = (ticket: string, which: "ticket1" | "ticket2") => {
    const pattern = /^(DES|GEN|DEV|PRO)_[A-Z0-9]{10}$/;
    if (!pattern.test(ticket)) {
      setShowWrongBubble(true);
      return;
    }
    const num = parseInt(ticket.slice(-3));
    if (num === 0 || num % totalDivisor !== 0) {
      setShowWrongBubble(true);
      return;
    }
    if (which === "ticket1") setTicket1Submitted(true);
    if (which === "ticket2") setTicket2Submitted(true);
  };

  const options = (() => {
    const prefixes = ["DES", "GEN", "DEV", "PRO"];
    const opts = [];
    for (const prefix of prefixes) {
      for (let i = 1; i < 10000; i++) {
        const suffix = i.toString().padStart(10, "0");
        opts.push(`${prefix}_${suffix}`);
      }
      opts.push(`${prefix}_AAAAAAAAAA`, `${prefix}_ZZZZZZZZZZ`);
    }
    return opts;
  })();

  const handleMouseEnterBox = (
    hoverRef: React.MutableRefObject<number>,
    setHideWholeBox: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
  
    hoverRef.current += 1;
    if (hoverRef.current <= 5) {
      setHideWholeBox(true);
      setTimeout(() => setHideWholeBox(false), 500);
    }
  };

  const handleBoxClick = (
    e: React.MouseEvent<HTMLDivElement>,
    setTicket: React.Dispatch<React.SetStateAction<string>>,
    claimRef: React.RefObject<HTMLElement | null>
  ) => {
  
    if (!claimRef.current || e.target !== claimRef.current) {
      setTicket("");
    }
  };

  const claimRef1 = useRef<HTMLElement | null>(null);
  const claimRef2 = useRef<HTMLElement | null>(null);
  const mainClaimRef = useRef<HTMLElement | null>(null);

  const registerRef = useRef(null);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 relative">
      {(showWrongBubble || showHowBubble) && (
        <div className="absolute top-10 bg-red-700 text-white px-6 py-4 rounded-xl text-center z-50 w-80">
          <div className="flex justify-between items-start">
            <div className="text-xl font-bold">
              {showWrongBubble ? "Wrong!!! Dumbass" : "Go to ask your mom below"}
            </div>
            <button
              onClick={() => {
                setShowWrongBubble(false);
                setShowHowBubble(false);
              }}
              className="ml-4 text-white text-lg font-bold hover:text-red-300"
            >×</button>
          </div>
          <div className="mt-4">
            <a
              href="https://www.youtube.com/watch?v=cTr69ADnqH0"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-red-700 font-semibold px-4 py-2 rounded block w-fit mx-auto hover:bg-red-100"
            >Close</a>
          </div>
        </div>
      )}

          <div className="absolute top-4 right-4">
          <button
            onClick={() => alert("Too lazy to create a login system 😴")}
            className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 py-2"
          >
            Login
            </button>
            </div>


      <h1 className="text-4xl font-bold mb-2">
        <span
          ref={mainClaimRef}
          className="cursor-pointer text-white hover:underline"
          onClick={() => {
            if (ticket1) handleSubmit(ticket1, "ticket1");
            else setShowWrongBubble(true);
          }}
        >Claim</span> Your Ticket
      </h1>

      <Button
        className="text-sm mb-6 border-gray-400 text-gray-300"
        onClick={() => setShowHowBubble(true)}
      >How to Get Tickets?</Button>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {!hideWholeBox1 && (
          <div
            className={`p-6 rounded-2xl w-56 text-center relative ${ticket1Submitted ? "bg-cyan-400" : "bg-white/10 backdrop-blur-lg"}`}
            onMouseEnter={() => handleMouseEnterBox(hoverCount1, setHideWholeBox1)}
            onClick={(e) => handleBoxClick(e, setTicket1, claimRef1)}
          >
            <h2 className={`text-2xl mb-4 ${ticket1Submitted ? "text-black font-mono" : "font-mono"}`}>
              {ticket1Submitted ? "DES Ticket Submitted" : "Ticket 1"}
            </h2>
            {!ticket1Submitted && (
              <>
                <select
                  className="mb-4 w-full text-black bg-white text-sm p-2 rounded h-10 overflow-y-scroll"
                  value={ticket1}
                  onChange={(e) => setTicket1(e.target.value)}
                >
                  <option value="">Enter Your Ticket</option>
                  {options.map((opt, index) => (
                    <option key={`ticket1-${index}`} value={opt}>{opt}</option>
                  ))}
                </select>
                <div className="relative inline-block">
                  <Button onClick={(e) => e.stopPropagation()} className="relative z-0">
                    <span
                      ref={claimRef1}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSubmit(ticket1, "ticket1");
                      }}
                      className="pointer-events-auto relative z-10"
                    >
                      Claim <span className="text-white">Ticket</span>
                    </span>
                  </Button>
                  <div className="absolute inset-0 z-0" />
                </div>
              </>
            )}
          </div>
        )}

        {!hideWholeBox2 && (
          <div
            className={`p-6 rounded-2xl w-56 text-center relative ${ticket2Submitted ? "bg-red-600" : "bg-white/10 backdrop-blur-lg"}`}
            onMouseEnter={() => handleMouseEnterBox(hoverCount2, setHideWholeBox2)}
            onClick={(e) => handleBoxClick(e, setTicket2, claimRef2)}
          >
            <h2 className={`text-2xl font-mono mb-4 ${ticket2Submitted ? "text-white" : ""}`}>
              {ticket2Submitted ? "GEN Ticket Submitted" : "Ticket 2"}
            </h2>
            {!ticket2Submitted && (
              <>
                <select
                  className="mb-4 w-full text-black bg-white text-sm p-2 rounded h-10 overflow-y-scroll"
                  value={ticket2}
                  onChange={(e) => setTicket2(e.target.value)}
                >
                  <option value="">Enter Your Ticket</option>
                  {options.map((opt, index) => (
                    <option key={`ticket2-${index}`} value={opt}>{opt}</option>
                  ))}
                </select>
                <div className="relative inline-block">
                  <Button onClick={(e) => e.stopPropagation()} className="relative z-0">
                    <span
                      ref={claimRef2}
                      onClick={(e) => {
                        e.stopPropagation();
                        setTicket2Submitted(true);
                      }}
                      className="pointer-events-auto relative z-10"
                    >
                      Claim <span className="text-white">Ticket</span>
                    </span>
                  </Button>
                  <div className="absolute inset-0 z-0" />
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-xl px-6 py-3 text-sm flex items-center gap-4">
        <span className="bg-blue-700 px-3 py-1 rounded text-white font-bold">DEV {devCount.current}</span>
        <span className="bg-cyan-600 px-3 py-1 rounded text-white font-bold">DES {desCount.current}</span>
        <span className="bg-yellow-600 px-3 py-1 rounded text-white font-bold">PRO {proCount.current}</span>
        <span
          className="bg-red-600 px-3 py-1 rounded text-white font-bold cursor-pointer"
          onClick={() => setTicket2Submitted(true)}
        >GEN {genCount.current}</span>
      </div>

      {ticket1Submitted && ticket2Submitted && (
        <div className="mt-10 flex flex-col items-center">
          <div className="animate-spin border-4 border-t-transparent border-green-500 rounded-full w-8 h-8 mb-4"></div>
          <Button
            ref={registerRef}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full relative"
            style={{
              position: "relative",
              transform: `translateX(${registerHoverCount < 20 ? (registerHoverCount % 2 === 0 ? 40 : -40) : 0}px)`
            }}
            onMouseEnter={() => {
              if (registerHoverCount < 20) {
                setRegisterHoverCount(registerHoverCount + 1);
              }
            }}
            onClick={() => router.push("/register")}
          >
            Register
          </Button>
        </div>
      )}
    </div>
  );
}
