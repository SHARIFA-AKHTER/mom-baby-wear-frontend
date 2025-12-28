// "use client";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactNode, useState } from "react";

// export default function QueryProvider({ children }: { children: ReactNode }) {
//   const [client] = useState(new QueryClient());

//   return (
//     <QueryClientProvider client={client}>
//       {children}
//     </QueryClientProvider>
//   );
// }

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
