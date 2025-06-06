import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
  } from "@/components/ui/sidebar"
  
  export function AppSidebar() {
    const items = [
      {
        title: "Home",
        url: "#",
        icon: "Home",
      },
      {
        title: "Inbox",
        url: "#",
        icon: "Inbox",
      },
      {
        title: "Calendar",
        url: "#",
        icon: "Calendar",
      },
      {
        title: "Search",
        url: "#",
        icon: "Search",
      },
      {
        title: "Settings",
        url: "#",
        icon: "Settings",
      },
    ]
    return (
    <div >
        <Sidebar style={{ marginTop: "64px" }}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    </div>
 
    )
  }
  