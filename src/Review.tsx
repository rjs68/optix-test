import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Box, Button, Modal } from "@mui/material";
import { ReviewForm } from "./ReviewForm";

export const Review = () => {
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const onClick = () => {
        setIsModalOpen(true);
    }

    return isMobile ? 
        (
            !isModalOpen ? (
                <Button variant="contained" onClick={onClick} sx={{marginY: '20px', width: '200px'}}>
                    Leave a Review
                </Button>
            ) : (
                <Modal open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                >
                    <Box sx={{
                        width: 'calc(100% - 80px)',
                        minHeight: '200px',
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '5px'
                    }}>
                        <ReviewForm />
                    </Box>
                </Modal>
            )
        )
        :
        (
            <ReviewForm/>
        )
};
