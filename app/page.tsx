import { FC } from 'react'
import Image from 'next/image'

const MAX_ROWS_DISPLAYED = 5;

interface Message {
  id: number;
  text: string;
  confident?: boolean;
  from: 'USER' | 'NEXU';
  table_id?: string;
}

const messages: Message[] = [
  {
    id: 1,
    text: "List my top 10 accounts",
    from: "USER"
  },
  {
    id: 2,
    text: "To find out how many accounts you have, you can use the following query:",
    from: "NEXU",
    confident: false,
    table_id: 'abc123',
  },
]

const ChatApp: FC = () => {
  return (
    <div className="grid place-items-center h-screen bg-[#F5F5F5] p-8">
      <main className="flex flex-col h-[45rem] bg-white w-full">
        <section className="flex-1 overflow-y-auto">
          <Messages />
        </section>
        <section className='sticky bottom-0 border-t border-slate-200'>
          <ChatBox />
        </section>
      </main>
    </div>
  )
}

export function Messages() {
  return (
    <div className="w-full grid place-items-center">
      {messages.map((message) => (
        <div key={message.id} className={`flex flex-col justify-center items-center w-full gap-2 py-7 ${message.from === "USER" ? 'bg-white' : 'bg-slate-100'}`}>
          <div className="w-3/4 overflow-x-auto">

            {/* CONFIDENCE */}
            {message.confident === false && (
              <span className="isolate inline-flex rounded-md shadow-xs mb-4">
                <button type="button" className="relative inline-flex items-center gap-x-2 rounded-l-md bg-white px-2.5 py-2 text-[14px] font-medium text-[#F0671A] ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 pr-3">
                  <Image
                    src="/images/info-orange.svg"
                    alt="Bookmark icon"
                    width={19}
                    height={19}
                  />
                  Not Confident
                </button>
                <button type="button" className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-2 py-2 text-[14px] font-medium text-[#F0671A] ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10 pl-3">
                  Human Help
                  <Image
                    src="/images/arrow-right.svg"
                    alt="Bookmark icon"
                    width={18}
                    height={18}
                    className='ml-2'
                  />
                </button>
              </span>
            )}

            {/* MESSAGE TEXT */}
            <div className="flex gap-2 items-end">
              <div className="flex justify-center items-center gap-2.5 rounded-lg">
                <div className={`w-8 h-8 overflow-hidden ${message.from === "USER" ? 'rounded-full' : ''}`}>
                  <Image
                    src={message.from === "USER" ? "/images/avatar.png" : "/images/nexu.svg"}
                    alt="avatar"
                    width={40}
                    height={40}
                  />
                </div>
                <p className="text-sm">
                  {message.text}
                </p>
              </div>
            </div>

            {/* DATA TABLE */}
            {message.table_id && (
              <div className="mt-1 flow-root pl-11 pr-[1px]">
                <div className="inline-block min-w-full py-2 align-middle">
                  <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {[
                            ['', true],
                            ['Name', true],
                            ['Industry', false],
                            ['City', true],
                            ['State', true],
                            ['Segment', false],
                            ['Owner ID', true]
                          ].map(([headerName, isSortable], idx) => {
                            return (
                              <th
                                key={idx}
                                scope="col"
                                className={`py-2.5 pl-3 text-left text-sm font-medium text-gray-500 ${idx === 0 && 'w-1/12'}`}
                              >
                                <span className="flex items-center gap-0.5 text-ellipsis whitespace-nowrap">
                                  {headerName}
                                  {isSortable && (
                                    <Image
                                      src="/images/chevrons-up-down.svg"
                                      alt="Sort icon"
                                      width={16}
                                      height={16}
                                      className="ml-2 cursor-pointer"
                                    />
                                  )}
                                </span>
                              </th>
                            )
                          }
                          )}
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-200 bg-white">
                        {Array.from({ length: MAX_ROWS_DISPLAYED }, () => (
                          <tr>
                            {["477", "Abbott - Pacocha", "IT", "Colo...", "CO", "Ente...", "7"].map(content =>
                              <td className={`${"whitespace-nowrap px-3 py-2.5 text-sm text-gray-800"} ${content === '477' ? 'pl-4' : ''}`}>{content}</td>
                            )}
                          </tr>
                        ))}

                        <tr className="text-sm leading-6 text-gray-900">
                          <th scope="colgroup" colSpan={7} className="relative isolate py-2 font-semibold">
                            <div className="absolute inset-y-0 left-0 -z-10 w-screen bg-gray-50" />
                            <div className='flex gap-2 items-center w-full'>
                              <Image
                                src="/images/info.svg"
                                alt="Info icon"
                                width={18}
                                height={18}
                                className="ml-3.5 mr-0.5"
                              />
                              <span className="text-[#555555] font-medium">
                                Only X rows are shown. View full list for more
                              </span>
                              <Image
                                src="/images/close.svg"
                                alt="Chevrons icon"
                                width={18}
                                height={18}
                                className="ml-3.5 cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2"
                              />
                            </div>
                          </th>
                        </tr>

                        <tr className="text-sm leading-6 text-gray-900">
                          <th scope="colgroup" colSpan={7} className="relative isolate py-2 font-semibold">
                            <div className="absolute inset-y-0 left-0 -z-10 w-screen bg-white" />
                            <div className='flex gap-4 w-full px-2.5 py-1'>
                              {['Show Full List', 'Show Query', 'Show Chart', "Pin to Dashboard"].map((buttonText, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  className="rounded-md bg-white px-3.5 py-2.5 text-xs text-gray-600 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                  {buttonText}
                                </button>
                              ))}
                            </div>
                          </th>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div >
      ))}
    </div>
  )
}

export function ChatBox() {
  return (
    <div className="w-full grid place-items-center">
      <div className="flex gap-2 py-4 items-start flex-col bg-white w-3/4">
        <div className="flex gap-2 mt-0.5">
          {Array.from({ length: 3 }, (_, i) => (
            <button
              key={i}
              type="button"
              className="rounded-md bg-white px-3 py-2 text-xs text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Suggest question {i + 1}
            </button>
          ))}
        </div>

        <div className="flex w-full h-10 mb-3.5">
          <div className="relative w-full mt-1 rounded-md shadow-xs">
            <div className="absolute inset-y-0 left-0 flex items-center">
              <div className="flex items-center h-full">
                <Image
                  src="/images/chat.svg"
                  alt="Chat icon"
                  width={20}
                  height={20}
                  className="absolute ml-2.5"
                />
                <select className="appearance-none h-full w-full rounded bg-transparent py-0.5 pl-9 pr-7 text-gray-700 text-sm border border-r-0 rounded-r-none border-gray-300 focus:outline-none cursor-pointer">
                  <option>Chat</option>
                </select>
                <Image
                  src="/images/chevrons-up-down.svg"
                  alt="Dropdown icon"
                  width={14}
                  height={14}
                  className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2"
                />
              </div>
            </div>
            <input
              type="text"
              placeholder="Start a new chat"
              className="block w-[calc(100%-6rem)] rounded-md border-0 px-3 py-1.5 ml-24 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 rounded-l-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <Image
              src="/images/send.svg"
              alt="Microphone icon"
              width={20}
              height={20}
              className="absolute right-2.5 top-1/2 transform -translate-y-1/2 cursor-pointer"
            />
          </div>
          <button
            type="button"
            className="rounded-md bg-white mt-1 ml-3 text-xs w-24 text-red-600 font-medium ring-1 ring-inset ring-red-600 shadow-xs hover:bg-gray-50"
          >
            End Chat
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatApp