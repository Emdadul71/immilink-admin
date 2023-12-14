import AppionmentList from "@/modules/appointment/list";
import CourseAddEdit from "@/modules/courses/add-edit";
import CourseLevelList from "@/modules/courses/levels/list";
import CourseList from "@/modules/courses/list";
import LeadList from "@/modules/lead/list";
import TeamDesignationList from "@/modules/team/designation";
import TeamLevelList from "@/modules/team/team_level/list";
import TestimonialAdd from "@/modules/testimonials/add/index";
import TestimonialList from "@/modules/testimonials/list";
import DesignationList from "@/modules/users/designation";
import { Spin } from "antd";
import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const PrivateOutlet = lazy(() => import("./private_outlet"));
const Dashboard = lazy(() => import("@/modules/dashboard"));
const Login = lazy(() => import("@/modules/auth/login/login"));
const PostList = lazy(() => import("@/modules/posts/list"));
const PostAdd = lazy(() => import("@/modules/posts/add"));
const ContactLayout = lazy(
  () => import("@/modules/contact/@layout/contact_layout")
);
const Inbox = lazy(() => import("@/modules/contact/@component/inbox"));
const ContactList = lazy(() => import("@/modules/contact/list/list"));
const Marked = lazy(() => import("@/modules/contact/@component/marked"));
const TeamList = lazy(() => import("@/modules/team/list"));
const TeamAdd = lazy(() => import("@/modules/team/add"));
const PhotoAlbum = lazy(() => import("@/modules/photo_album/list"));
const MediaList = lazy(() => import("@/modules/media"));
const CategoriesList = lazy(() => import("@/modules/posts/categories/list"));
const NewsList = lazy(() => import("@/modules/news/list"));
const NewsAdd = lazy(() => import("@/modules/news/add"));
const Config = lazy(() => import("@/modules/news/config"));
const TagList = lazy(() => import("@/modules/posts/tags/list"));
const PageList = lazy(() => import("@/modules/pages/list"));
const CreateEvent = lazy(() => import("@/modules/events/create_events"));
const PageAdd = lazy(() => import("@/modules/pages/add"));
const Appointment = lazy(() => import("@/modules/appointment/list"));
const Events = lazy(() => import("@/modules/events/list"));
const ParticipantedUser = lazy(() => import("@/modules/events/participants"));
const PopUpList = lazy(() => import("@/modules/events/participants"));
const AddPopUp = lazy(() => import("@/modules/pop_up/add"));
const UserList = lazy(() => import("@/modules/users/list"));
const UserAdd = lazy(() => import("@/modules/users/add"));
const UserModule = lazy(() => import("@/modules/users/module"));
const UserRole = lazy(() => import("@/modules/users/role"));
const UserPermissions = lazy(() => import("@/modules/users/permissions"));
const UserDetails = lazy(() => import("@/modules/users/details"));
const Settings = lazy(() => import("@/modules/settings"));
const Temp = lazy(() => import("@/modules/temp"));

const AppRouter = () => {
  return (
    <Suspense
      fallback={
        <div className="grid place-content-center h-screen w-screen">
          <Spin tip="Loading" size="large" />
        </div>
      }
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/" element={<PrivateOutlet />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Courses */}

          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/add" element={<CourseAddEdit />} />
          <Route path="/courses/edit/:id" element={<CourseAddEdit />} />
          <Route path="/courses/levels" element={<CourseLevelList />} />

          {/* post & post dependency routes */}
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/add" element={<PostAdd />} />
          <Route path="/posts/:id/edit" element={<PostAdd />} />
          <Route path="/categories/list" element={<CategoriesList />} />
          <Route path="/tags/list" element={<TagList />} />
          {/* Media */}
          <Route path="/media/list" element={<MediaList />} />
          {/* Contact */}
          <Route path="/contact" element={<ContactLayout />}>
            <Route path="/contact" element={<Navigate to="/contact/list" />} />
            <Route path="/contact/inbox" element={<Inbox />} />
            <Route path="/contact/marked" element={<Marked />} />
            <Route path="/contact/sent" element={<>Sent</>} />
            <Route path="/contact/spam" element={<>spam</>} />
            <Route path="/contact/draft" element={<>draft</>} />
            <Route path="/contact/trash" element={<>trash</>} />
            <Route path="/contact/:id" element={<>detail</>} />
          </Route>
          <Route path="/contact/list" element={<ContactList />} />
          {/* Team */}
          <Route path="/team/list" element={<TeamList />} />
          <Route path="/team/lavel" element={<TeamLevelList />} />
          <Route path="/team/designation" element={<TeamDesignationList />} />
          <Route path="/team/add" element={<TeamAdd />} />
          <Route path="/team/:id/edit" element={<TeamAdd />} />

          <Route path="/photo-album/list" element={<PhotoAlbum />} />

          <Route path="/news/list" element={<NewsList />} />
          <Route path="/news/add" element={<NewsAdd />} />
          <Route path="/news/config" element={<Config />} />

          <Route path="/page/list" element={<PageList />} />
          <Route path="/page/add" element={<PageAdd />} />

          <Route path="/appointment" element={<Appointment />} />

          <Route path="/events" element={<Events />} />
          <Route path="/events/add" element={<CreateEvent />} />
          <Route path="/events/:id/edit" element={<CreateEvent />} />
          <Route path="/events/:slug" element={<ParticipantedUser />} />
          <Route path="/lead/list" element={<LeadList />} />
          <Route path="/appointment/list" element={<AppionmentList />} />

          {/* <Route path="/participants" element={<Participants />} /> */}

          <Route path="/pop-up" element={<PopUpList />} />
          <Route path="/pop-up/add" element={<AddPopUp />} />

          {/* testimonials */}
          <Route path="/testimonial/list" element={<TestimonialList />} />
          <Route path="/testimonial/add" element={<TestimonialAdd />} />
          <Route path="/testimonial/:id/edit" element={<TestimonialAdd />} />

          {/* User module routes */}
          <Route path="/designations" element={<DesignationList />} />
          <Route path="/user/list" element={<UserList />} />
          <Route path="/user/add" element={<UserAdd />} />
          <Route path="/user/module" element={<UserModule />} />
          <Route path="/user/role" element={<UserRole />} />
          <Route path="/user/permissions" element={<UserPermissions />} />
          <Route path="/user/:id" element={<UserDetails />} />

          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/profile" element={<UserDetails />} />

          <Route path="/temp" element={<Temp />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
