"use client";

import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setValue as setDelayedMessageValue } from "../state/features/delayedMessage";
import { setValue as setPrecededValue } from "../state/features/preceded";
import { useAppDispatch, useAppSelector } from "../state/store";
import { DelayedMessage } from "./DelayedMessage";
import { Preceded } from "./Preceded";

const pump = async (
  reader: ReadableStreamDefaultReader<Uint8Array>,
  dispatcher: ReturnType<typeof useDispatch>
) => {
  const content = await reader.read();
  if (content.done) {
    return;
  } else {
    const value = new TextDecoder().decode(content.value);
    console.log({ value });
    try {
      const v = JSON.parse(value);
      if (v["preceded"]) {
        dispatcher(setPrecededValue(v["preceded"]));
      }
      if (v["message"]) {
        dispatcher(setDelayedMessageValue(v["message"]));
      }
    } catch (error) {
      console.error(error);
    }
    await pump(reader, dispatcher);
  }
};

export function Main() {
  const preceded = useAppSelector((state) => state.preceded.value);
  const delayedMessage = useAppSelector((state) => state.delayedMessage.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch("http://localhost:8000/st", {
      cache: "no-store",
      next: { revalidate: 0 },
    }).then((res) => {
      const reader = res.body?.getReader();
      if (reader) {
        pump(reader, dispatch);
      }
    });
  }, []);

  return (
    <div className=''>
      <Suspense fallback={<p>...</p>}>
        <Preceded preceded={preceded} />
      </Suspense>
      <Suspense fallback={<p>...</p>}>
        <DelayedMessage message={delayedMessage} />
      </Suspense>
    </div>
  );
}
