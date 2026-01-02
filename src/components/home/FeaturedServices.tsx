"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import { AiOutlineSchedule } from "react-icons/ai";

interface Service {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  duration: number;
  image: string;
  isActive: boolean;
  isFeatured: boolean;
}

export default function FeaturedServices() {
  // Services section removed. Placeholder component to avoid import errors.
  return null;
}


