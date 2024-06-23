import { useRef, useState, useEffect } from "react";
import {
  Box,
  Input,
  FormLabel,
  Button,
  Text,
  VStack,
  IconButton,
  HStack,
  Flex,
} from "@chakra-ui/react";
import JoditEditor from "jodit-react";
import DashboardLayout from "../../components/DashboardLayout";
import { fireDB } from "../../../firebase/FirebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserNotifications,
  selectNotifications,
} from "../../../redux/notifications/userNotificationsSlice";
import DOMPurify from "dompurify";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify";

const NotificationForUser = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserNotifications());
  }, [dispatch]);

  const notifications = useSelector(selectNotifications);

  const handleSave = async () => {
    if (!title || !content) {
      toast.error("Please enter title and content.");
      return;
    }

    try {
      await addDoc(collection(fireDB, "userNotifications"), {
        title,
        content,
        createdAt: new Date().toISOString(),
      });
      setTitle("");
      setContent("");
      toast.success("Notification saved successfully!");
      dispatch(fetchUserNotifications());
    } catch (error) {
      console.error("Error saving notification: ", error);
      toast.error("An error occurred while saving the notification.");
    }
  };

  const handleEdit = (notificationId) => {
    const notification = notifications.find((n) => n.id === notificationId);
    if (notification) {
      setTitle(notification.title);
      setContent(notification.content);
      setEditingId(notificationId);
    }
  };

  const handleDelete = async (notificationId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this notification?");
    
    if (!confirmDelete) {
      return; // Exit the function if the user cancels the action
    }
    
    try {
      await deleteDoc(doc(fireDB, "userNotifications", notificationId));
      toast.success("Notification deleted successfully!");
      dispatch(fetchUserNotifications());
    } catch (error) {
      console.error("Error deleting notification: ", error);
      toast.error("An error occurred while deleting the notification.");
    }
  };
  

  const handleUpdate = async () => {
    if (!title || !content) {
      toast.error("Please enter title and content.");
      return;
    }

    try {
      await updateDoc(doc(fireDB, "userNotifications", editingId), {
        title,
        content,
      });
      setTitle("");
      setContent("");
      setEditingId(null);
      toast.success("Notification updated successfully!");
      dispatch(fetchUserNotifications());
    } catch (error) {
      console.error("Error updating notification: ", error);
      toast.error("An error occurred while updating the notification.");
    }
  };

  return (
    <DashboardLayout title="Add User Notice">
      <Box maxW={{ md: "40vw", base: "90vw" }} mx="auto" p={6}>
        <Box mb={4}>
          <FormLabel fontSize="larger" fontWeight="semibold">
            Title
          </FormLabel>
          <Input
            bg="white"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
        <Box mb={4}>
          <FormLabel fontSize="larger" fontWeight="semibold">
            Description
          </FormLabel>
          <JoditEditor
            ref={editor}
            value={content}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
            onChange={(newContent) => {}}
          />
        </Box>

        {editingId ? (
          <Button colorScheme="blue" onClick={handleUpdate}>
            Update
          </Button>
        ) : (
          <Button colorScheme="blue" onClick={handleSave}>
            Add
          </Button>
        )}

        <VStack mt={6} align="stretch">
          <Text fontSize="x-large" fontWeight="semibold">
            All Notifications
          </Text>
          {notifications.map((notification, index) => (
            <Box key={notification.id}>
              <HStack
                justify="space-between"
                border="1px solid gray"
                bg="white"
                borderRadius="md"
                p={{ base: "4", md: "2" }}
              >
                <Flex gap={2} align="center" fontSize="18px">
                  <Text fontWeight="semibold">{index + 1}.</Text>
                  <Text>{notification.title}</Text>
                </Flex>
                <Flex gap={2}>
                  <IconButton
                    icon={<EditIcon />}
                    variant="outline"
                    colorScheme="teal"
                    aria-label="Edit"
                    onClick={() => handleEdit(notification.id)}
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    aria-label="Delete"
                    onClick={() => handleDelete(notification.id)}
                  />
                </Flex>
              </HStack>
              {/* <Text
                mt={5}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(notification.content),
                }}
              /> */}
            </Box>
          ))}
        </VStack>
      </Box>
    </DashboardLayout>
  );
};

export default NotificationForUser;
