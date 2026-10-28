import { useMemo, useState } from "react"
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Bell,
  Check,
  CheckCheck,
  ChevronDown,
  CircleHelp,
  Clock3,
  ContactRound,
  FileText,
  Inbox,
  LayoutDashboard,
  LockKeyhole,
  Mail,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Paperclip,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react"

type Page = "Overview" | "Audience" | "Campaigns" | "Inbox"
type Channel = "Email" | "WhatsApp"
type Group = {
  id: number
  name: string
  description: string
  count: number
  color: string
  initials: string[]
}

const initialGroups: Group[] = [
  {
    id: 1,
    name: "Export buyers",
    description: "International buyers and trade partners",
    count: 842,
    color: "sage",
    initials: ["AM", "JK", "SL"],
  },
  {
    id: 2,
    name: "Distributors and franchisees",
    description: "Distribution and franchise network",
    count: 316,
    color: "amber",
    initials: ["NF", "CR", "TJ"],
  },
  {
    id: 3,
    name: "Retail customers",
    description: "Direct and recurring retail buyers",
    count: 204,
    color: "lilac",
    initials: ["RM", "BS", "LP"],
  },
]

const conversations = [
  {
    name: "Aisha Martins",
    initials: "AM",
    channel: "whatsapp",
    message: "Yes, I would love to know more about the offer.",
    time: "10:42",
    unread: true,
  },
  {
    name: "Noah Fischer",
    initials: "NF",
    channel: "email",
    message: "Thanks for reaching out. Is this valid until Friday?",
    time: "09:18",
    unread: true,
  },
  {
    name: "James Kim",
    initials: "JK",
    channel: "whatsapp",
    message: "Perfect, thank you!",
    time: "Yesterday",
    unread: false,
  },
]

const navItems: { label: Page icon: typeof LayoutDashboard badge?: string }[] =
  [
    { label: "Overview", icon: LayoutDashboard },
    { label: "Audience", icon: ContactRound },
    { label: "Campaigns", icon: Send },
    { label: "Inbox", icon: Inbox, badge: "5" },
  ]

export default function App() {
  const [page, setPage] = useState<Page>("Overview")
  const [groups, setGroups] = useState(initialGroups)
  const [showComposer, setShowComposer] = useState(false)
  const [showGroupModal, setShowGroupModal] = useState(false)
  const [channel, setChannel] = useState<Channel>("WhatsApp")
  const [groupName, setGroupName] = useState("")
  const [groupDescription, setGroupDescription] = useState("")
  const [search, setSearch] = useState("")
  const [mobileNav, setMobileNav] = useState(false)
  const [toast, setToast] = useState("")

  const totalContacts = useMemo(
    () => groups.reduce((sum, group) => sum + group.count, 0),
    [groups],
  )

  function flash(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(""), 2800)
  }

  function createGroup() {
    if (!groupName.trim()) return
    setGroups((current) => [
      ...current,
      {
        id: Date.now(),
        name: groupName.trim(),
        description: groupDescription.trim() || "New customer segment",
        count: 0,
        color: "blue",
        initials: ["NEW"],
      },
    ])
    setGroupName("")
    setGroupDescription("")
    setShowGroupModal(false)
    flash("Customer group created")
  }

  function sendCampaign() {
    setShowComposer(false)
    flash(`${channel} campaign queued securely`)
  }

  return (
    <div className="app-shell">
      <aside className={mobileNav ? "sidebar open" : "sidebar"}>
        <div className="brand">
          <div className="brand-mark">
            <img src="/saarthi-logo.png" alt="Saarthi logo" />
          </div>
          <button
            className="icon-button sidebar-close"
            onClick={() => setMobileNav(false)}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          <p className="nav-label">Workspace</p>
          {navItems.map((item) => (
            <button
              className={`nav-item ${page === item.label ? "active" : ""}`}
              onClick={() => {
                setPage(item.label)
                setMobileNav(false)
              }}
              key={item.label}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
              {item.badge && <strong>{item.badge}</strong>}
            </button>
          ))}
          <p className="nav-label nav-label-second">Manage</p>
          <button className="nav-item">
            <FileText size={18} />
            <span>Templates</span>
          </button>
          <button className="nav-item">
            <BarChart3 size={18} />
            <span>Reports</span>
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="security-mini">
            <ShieldCheck size={19} />
            <div>
              <b>Data protected</b>
              <span>256-bit encryption</span>
            </div>
          </div>
          <button className="nav-item">
            <CircleHelp size={18} />
            <span>Help center</span>
          </button>
          <button className="nav-item">
            <Settings size={18} />
            <span>Settings</span>
          </button>
          <div className="profile">
            <div className="avatar avatar-dark">SB</div>
            <div>
              <b>Sapthagiri Boggaram</b>
              <span>mail@sarathi.com</span>
            </div>
            <MoreHorizontal size={18} />
          </div>
        </div>
      </aside>

      {mobileNav && (
        <button
          className="nav-scrim"
          onClick={() => setMobileNav(false)}
          aria-label="Close navigation"
        />
      )}

      <main className="main">
        <header className="topbar">
          <button
            className="icon-button menu-button"
            onClick={() => setMobileNav(true)}
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>
          <div className="crumb">
            <span>Saarthi</span>
            <span>/</span>
            <b>{page}</b>
          </div>
          <div className="topbar-actions">
            <button
              className="search-trigger"
              onClick={() => document.getElementById("global-search")?.focus()}
            >
              <Search size={17} />
              <span>Search anything</span>
              <kbd>⌘ K</kbd>
            </button>
            <button
              className="icon-button notification"
              aria-label="Notifications"
            >
              <Bell size={19} />
              <i />
            </button>
            <button
              className="primary-button"
              onClick={() => setShowComposer(true)}
            >
              <Plus size={18} />
              New campaign
            </button>
          </div>
        </header>

        <section className="content">
          {page === "Overview" && (
            <Overview
              groups={groups}
              totalContacts={totalContacts}
              setPage={setPage}
              openComposer={(type) => {
                setChannel(type)
                setShowComposer(true)
              }}
              openGroup={() => setShowGroupModal(true)}
            />
          )}
          {page === "Audience" && (
            <Audience
              groups={groups}
              totalContacts={totalContacts}
              openGroup={() => setShowGroupModal(true)}
              search={search}
              setSearch={setSearch}
            />
          )}
          {page === "Campaigns" && (
            <Campaigns openComposer={() => setShowComposer(true)} />
          )}
          {page === "Inbox" && <InboxPage />}
        </section>
      </main>

      {showComposer && (
        <Composer
          channel={channel}
          setChannel={setChannel}
          groups={groups}
          onClose={() => setShowComposer(false)}
          onSend={sendCampaign}
        />
      )}
      {showGroupModal && (
        <Modal
          title="Create customer group"
          subtitle="Organize contacts into a focused audience."
          onClose={() => setShowGroupModal(false)}
        >
          <label className="field-label">Group name</label>
          <input
            autoFocus
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="e.g. VIP customers"
          />
          <label className="field-label">Description</label>
          <textarea
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
            placeholder="What defines this group?"
            rows={3}
          />
          <div className="modal-actions">
            <button
              className="secondary-button"
              onClick={() => setShowGroupModal(false)}
            >
              Cancel
            </button>
            <button
              className="primary-button"
              onClick={createGroup}
              disabled={!groupName.trim()}
            >
              Create group
            </button>
          </div>
        </Modal>
      )}
      {toast && (
        <div className="toast">
          <Check size={17} />
          {toast}
        </div>
      )}
    </div>
  )
}

function Overview({
  groups,
  totalContacts,
  setPage,
  openComposer,
  openGroup,
}: {
  groups: Group[]
  totalContacts: number
  setPage: (page: Page) => void
  openComposer: (type: Channel) => void
  openGroup: () => void
}) {
  const today = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })
    .format(new Date())
    .toUpperCase()

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">{today}</p>
          <h1>Good morning, Sapthagiri</h1>
          <p>Here’s what’s happening with your customer relationships.</p>
        </div>
        <div className="live-status">
          <i />
          All systems operational
        </div>
      </div>

      <div className="stat-grid">
        <StatCard
          label="Total contacts"
          value={totalContacts.toLocaleString()}
          note="8.4% this month"
          positive
          icon={<UsersRound size={19} />}
        />
        <StatCard
          label="Messages sent"
          value="8,429"
          note="1,240 this week"
          icon={<Send size={19} />}
        />
        <StatCard
          label="Open rate"
          value="68.4%"
          note="4.2% above average"
          positive
          icon={<Mail size={19} />}
        />
        <StatCard
          label="Replies"
          value="184"
          note="23 need a reply"
          accent
          icon={<Inbox size={19} />}
        />
      </div>

      <div className="dashboard-grid">
        <div className="panel groups-panel">
          <div className="panel-header">
            <div>
              <h2>Customer groups</h2>
              <p>Your key audience segments</p>
            </div>
            <button className="text-button" onClick={() => setPage("Audience")}>
              View all <ArrowUpRight size={15} />
            </button>
          </div>
          <div className="group-list">
            {groups.slice(0, 3).map((group) => (
              <GroupRow key={group.id} group={group} />
            ))}
          </div>
          <button className="add-group-button" onClick={openGroup}>
            <Plus size={17} />
            Create a new group
          </button>
        </div>

        <div className="panel quick-panel">
          <div className="panel-header">
            <div>
              <h2>Quick send</h2>
              <p>Reach your customers in a few clicks</p>
            </div>
          </div>
          <button
            className="quick-card whatsapp"
            onClick={() => openComposer("WhatsApp")}
          >
            <span className="quick-icon">
              <MessageCircle size={21} />
            </span>
            <span>
              <b>Send WhatsApp</b>
              <small>Start a broadcast message</small>
            </span>
            <ArrowUpRight size={18} />
          </button>
          <button
            className="quick-card email"
            onClick={() => openComposer("Email")}
          >
            <span className="quick-icon">
              <Mail size={21} />
            </span>
            <span>
              <b>Send an email</b>
              <small>Create an email campaign</small>
            </span>
            <ArrowUpRight size={18} />
          </button>
          <div className="secure-note">
            <LockKeyhole size={16} />
            <span>
              <b>Secure by default.</b> Messages are encrypted in transit.
            </span>
          </div>
        </div>

        <div className="panel recent-panel">
          <div className="panel-header">
            <div>
              <h2>Recent activity</h2>
              <p>Latest campaign performance</p>
            </div>
            <button className="icon-button">
              <MoreHorizontal size={19} />
            </button>
          </div>
          <div className="campaign-row campaign-head">
            <span>Campaign</span>
            <span>Channel</span>
            <span>Audience</span>
            <span>Sent</span>
            <span>Performance</span>
          </div>
          <CampaignRow
            title="Summer welcome offer"
            time="Today, 9:30 AM"
            channel="WhatsApp"
            audience="Distributors and franchisees"
            sent="312"
            performance="76% read"
          />
          <CampaignRow
            title="We miss you, come back"
            time="12 Jun, 2:15 PM"
            channel="Email"
            audience="Retail customers"
            sent="201"
            performance="64% opened"
          />
          <CampaignRow
            title="Members-only preview"
            time="10 Jun, 11:00 AM"
            channel="Email"
            audience="Export buyers"
            sent="836"
            performance="71% opened"
          />
        </div>
      </div>
    </>
  )
}

function StatCard({
  label,
  value,
  note,
  positive,
  accent,
  icon,
}: {
  label: string
  value: string
  note: string
  positive?: boolean
  accent?: boolean
  icon: React.ReactNode
}) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span className={accent ? "stat-icon accent" : "stat-icon"}>
          {icon}
        </span>
        <MoreHorizontal size={18} />
      </div>
      <p>{label}</p>
      <h3>{value}</h3>
      <span className={positive ? "stat-note positive" : "stat-note"}>
        {positive && <ArrowUpRight size={14} />}
        {note}
      </span>
    </div>
  )
}

function GroupRow({ group }: { group: Group }) {
  return (
    <button className="group-row">
      <span className={`group-dot ${group.color}`} />
      <span className="group-copy">
        <b>{group.name}</b>
        <small>{group.description}</small>
      </span>
      <span className="mini-avatars">
        {group.initials.map((item) => (
          <i key={item}>{item}</i>
        ))}
      </span>
      <span className="group-count">
        {group.count.toLocaleString()}
        <small>contacts</small>
      </span>
      <ArrowUpRight size={17} />
    </button>
  )
}

function CampaignRow({
  title,
  time,
  channel,
  audience,
  sent,
  performance,
}: {
  title: string
  time: string
  channel: Channel
  audience: string
  sent: string
  performance: string
}) {
  return (
    <div className="campaign-row">
      <span className="campaign-name">
        <b>{title}</b>
        <small>{time}</small>
      </span>
      <span>
        <i className={`channel-icon ${channel.toLowerCase()}`}>
          {channel === "Email" ? (
            <Mail size={15} />
          ) : (
            <MessageCircle size={15} />
          )}
        </i>
        {channel}
      </span>
      <span>{audience}</span>
      <span>{sent}</span>
      <span className="performance">
        <CheckCheck size={15} />
        {performance}
      </span>
    </div>
  )
}

function Audience({
  groups,
  totalContacts,
  openGroup,
  search,
  setSearch,
}: {
  groups: Group[]
  totalContacts: number
  openGroup: () => void
  search: string
  setSearch: (value: string) => void
}) {
  const visible = groups.filter((group) =>
    group.name.toLowerCase().includes(search.toLowerCase()),
  )
  return (
    <>
      <div className="page-heading compact">
        <div>
          <p className="eyebrow">AUDIENCE</p>
          <h1>Customer groups</h1>
          <p>
            {totalContacts.toLocaleString()} contacts across {groups.length}{" "}
            groups
          </p>
        </div>
        <button className="primary-button" onClick={openGroup}>
          <Plus size={18} />
          Create group
        </button>
      </div>
      <div className="toolbar panel">
        <div className="search-box">
          <Search size={18} />
          <input
            id="global-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search groups..."
          />
        </div>
        <button className="secondary-button">
          All contacts <ChevronDown size={16} />
        </button>
      </div>
      <div className="audience-grid">
        {visible.map((group) => (
          <div className="audience-card panel" key={group.id}>
            <div className="audience-card-top">
              <span className={`large-group-icon ${group.color}`}>
                <UsersRound size={22} />
              </span>
              <button className="icon-button">
                <MoreHorizontal size={18} />
              </button>
            </div>
            <h2>{group.name}</h2>
            <p>{group.description}</p>
            <div className="audience-total">
              <b>{group.count.toLocaleString()}</b>
              <span>contacts</span>
            </div>
            <div className="audience-foot">
              <span className="mini-avatars">
                {group.initials.map((item) => (
                  <i key={item}>{item}</i>
                ))}
              </span>
              <button className="text-button">
                Open group <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function Campaigns({ openComposer }: { openComposer: () => void }) {
  return (
    <>
      <div className="page-heading compact">
        <div>
          <p className="eyebrow">CAMPAIGNS</p>
          <h1>Message campaigns</h1>
          <p>Create, schedule, and track customer outreach.</p>
        </div>
        <button className="primary-button" onClick={openComposer}>
          <Plus size={18} />
          New campaign
        </button>
      </div>
      <div className="campaign-summary">
        <div>
          <span>Sent this month</span>
          <b>4,826</b>
        </div>
        <div>
          <span>Average open rate</span>
          <b>68.4%</b>
        </div>
        <div>
          <span>Reply rate</span>
          <b>12.7%</b>
        </div>
      </div>
      <div className="panel campaigns-table">
        <div className="panel-header">
          <div>
            <h2>All campaigns</h2>
            <p>Recent email and WhatsApp broadcasts</p>
          </div>
          <button className="secondary-button">
            Last 30 days <ChevronDown size={15} />
          </button>
        </div>
        <div className="campaign-row campaign-head">
          <span>Campaign</span>
          <span>Channel</span>
          <span>Audience</span>
          <span>Sent</span>
          <span>Performance</span>
        </div>
        <CampaignRow
          title="Summer welcome offer"
          time="Today, 9:30 AM"
          channel="WhatsApp"
          audience="Distributors and franchisees"
          sent="312"
          performance="76% read"
        />
        <CampaignRow
          title="We miss you, come back"
          time="12 Jun, 2:15 PM"
          channel="Email"
          audience="Retail customers"
          sent="201"
          performance="64% opened"
        />
        <CampaignRow
          title="Members-only preview"
          time="10 Jun, 11:00 AM"
          channel="Email"
          audience="Export buyers"
          sent="836"
          performance="71% opened"
        />
        <CampaignRow
          title="June product update"
          time="5 Jun, 10:20 AM"
          channel="WhatsApp"
          audience="Export buyers"
          sent="824"
          performance="82% read"
        />
      </div>
    </>
  )
}

function InboxPage() {
  const [selected, setSelected] = useState(0)
  return (
    <>
      <div className="page-heading compact">
        <div>
          <p className="eyebrow">SHARED INBOX</p>
          <h1>Customer replies</h1>
          <p>Email and WhatsApp conversations in one secure place.</p>
        </div>
        <div className="connection-pills">
          <span>
            <i />
            WhatsApp connected
          </span>
          <span>
            <i />
            Email connected
          </span>
        </div>
      </div>
      <div className="inbox-layout panel">
        <div className="conversation-list">
          <div className="inbox-search">
            <Search size={17} />
            <input placeholder="Search conversations" />
          </div>
          <div className="inbox-tabs">
            <button className="active">
              All <b>5</b>
            </button>
            <button>Unread</button>
          </div>
          {conversations.map((item, index) => (
            <button
              className={`conversation ${selected === index ? "active" : ""}`}
              onClick={() => setSelected(index)}
              key={item.name}
            >
              <span className="avatar">{item.initials}</span>
              <span className="conversation-copy">
                <b>{item.name}</b>
                <small>{item.message}</small>
              </span>
              <span className="conversation-meta">
                <small>{item.time}</small>
                {item.unread && <i />}
              </span>
            </button>
          ))}
        </div>
        <div className="message-view">
          <div className="message-header">
            <button className="icon-button mobile-back">
              <ArrowLeft size={18} />
            </button>
            <span className="avatar">{conversations[selected].initials}</span>
            <div>
              <b>{conversations[selected].name}</b>
              <span>
                {conversations[selected].channel === "email"
                  ? "via Email"
                  : "via WhatsApp"}
              </span>
            </div>
            <button className="icon-button">
              <MoreHorizontal size={19} />
            </button>
          </div>
          <div className="message-body">
            <span className="date-divider">Today</span>
            <div className="bubble sent">
              Hi {conversations[selected].name.split(" ")[0]}, we have a special
              offer selected for you. Would you like to learn more?
              <small>
                10:38 <CheckCheck size={13} />
              </small>
            </div>
            <div className="bubble received">
              {conversations[selected].message}
              <small>{conversations[selected].time}</small>
            </div>
          </div>
          <div className="reply-box">
            <button className="icon-button">
              <Paperclip size={18} />
            </button>
            <input placeholder="Write a reply..." />
            <button className="send-button">
              <Send size={17} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

function Composer({
  channel,
  setChannel,
  groups,
  onClose,
  onSend,
}: {
  channel: Channel
  setChannel: (value: Channel) => void
  groups: Group[]
  onClose: () => void
  onSend: () => void
}) {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  return (
    <div className="modal-backdrop">
      <div className="composer">
        <div className="modal-header">
          <div>
            <p className="eyebrow">NEW CAMPAIGN</p>
            <h2>Compose message</h2>
            <span>Send a secure message to a customer group.</span>
          </div>
          <button className="icon-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="channel-tabs">
          <button
            className={channel === "WhatsApp" ? "active whatsapp" : ""}
            onClick={() => setChannel("WhatsApp")}
          >
            <MessageCircle size={18} />
            WhatsApp
          </button>
          <button
            className={channel === "Email" ? "active email" : ""}
            onClick={() => setChannel("Email")}
          >
            <Mail size={18} />
            Email
          </button>
        </div>
        <div className="composer-body">
          <label className="field-label">Send to</label>
          <div className="select-wrap">
            <UsersRound size={17} />
            <select>
              <option>Select a customer group</option>
              {groups.map((group) => (
                <option key={group.id}>
                  {group.name} — {group.count} contacts
                </option>
              ))}
            </select>
            <ChevronDown size={17} />
          </div>
          {channel === "Email" && (
            <>
              <label className="field-label">Subject</label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Add a clear subject line"
              />
            </>
          )}
          <label className="field-label">Message</label>
          <div className="message-editor">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={7}
              placeholder={`Write your ${channel} message...`}
            />
            <div>
              <button>
                <Sparkles size={15} />
                Improve with AI
              </button>
              <span>{message.length} / 1,000</span>
            </div>
          </div>
          <div className="encryption-callout">
            <ShieldCheck size={19} />
            <div>
              <b>Protected delivery</b>
              <span>
                Your message and customer data are encrypted in transit.
              </span>
            </div>
          </div>
        </div>
        <div className="composer-actions">
          <button className="secondary-button" onClick={onClose}>
            Save draft
          </button>
          <button className="schedule-button">
            <Clock3 size={17} />
            Schedule
          </button>
          <button
            className="primary-button"
            onClick={onSend}
            disabled={!message.trim()}
          >
            <Send size={17} />
            Review & send
          </button>
        </div>
      </div>
    </div>
  )
}

function Modal({
  title,
  subtitle,
  onClose,
  children,
}: {
  title: string
  subtitle: string
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    <div className="modal-backdrop">
      <div className="small-modal">
        <div className="modal-header">
          <div>
            <h2>{title}</h2>
            <span>{subtitle}</span>
          </div>
          <button className="icon-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  )
}
